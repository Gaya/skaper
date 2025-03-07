import formatTitle from './lib/formatTitle';

export type ImageSize = 'og' | 'twitter';
export type HAlign = 'left' | 'center' | 'right';
export type VAlign = 'top' | 'middle' | 'bottom';

interface BackgroundLayer {
  type: 'background';
  color: string;
  image?: string;
}

interface TextLayer {
  type: 'text';
  color: string;
  size: number;
  text: string;
  vAlign: VAlign;
  hAlign: HAlign;
  highlightColor?: string;
}

type RenderLayer = BackgroundLayer | TextLayer;

interface RenderConfig {
  imageSize: ImageSize;
  background: {
    image?: string;
    color: string;
  },
  title: {
    color: string;
    letterSpacing: number;
    hAlign: HAlign;
    vAlign: VAlign;
    highlightColor?: string;
  };
}

function imageSizeToDimensions(size: RenderConfig['imageSize']) {
  if (size === 'twitter') {
    return [1200, 675];
  }

  return [1200, 630];
}

async function renderLayers(
  layers: RenderLayer[],
  ctx: CanvasRenderingContext2D,
  config: RenderConfig,
): Promise<void> {
  const [targetWidth, targetHeight] = imageSizeToDimensions(config.imageSize);
  const canvasRect = ctx.canvas.getBoundingClientRect();
  const canvasWidth = canvasRect.width;

  const scaled = (n: number) => n / (targetWidth / canvasWidth);

  const promises: (() => Promise<void>)[] = layers.reverse().map((layer) => {
    return () => new Promise((resolve) => {
      if (layer.type === 'background') {
        // background layer
        ctx.fillStyle = layer.color;
        ctx.fillRect(0, 0, scaled(targetWidth), scaled(targetHeight));

        if (layer.image) {
          return new Promise<void>((resolveImage) => {
            if (layer.image) {
              const image = document.createElement('img');
              image.src = layer.image;
              image.addEventListener('load', () => {
                const imageRatio = image.width / image.height;
                const coverRatio = targetWidth / targetHeight;

                let coverHeight;
                let coverWidth;
                let x = 0;
                let y = 0;

                if (imageRatio >= coverRatio) {
                  coverHeight = targetHeight;
                  const scale = coverHeight / image.height;
                  coverWidth = image.width * scale;
                } else {
                  coverWidth = targetWidth;
                  const scale = coverWidth / image.width;
                  coverHeight = image.height * scale;
                }

                if (coverWidth > targetWidth) {
                  x = ((coverWidth - targetWidth) / 2) * -1;
                }

                if (coverHeight > targetHeight) {
                  y = ((coverHeight - targetHeight) / 2) * -1;
                }

                ctx.drawImage(image, scaled(x), scaled(y), scaled(coverWidth), scaled(coverHeight));
                return resolveImage();
              });
            } else {
              return resolveImage();
            }
          }).then(() => resolve());
        } else {
          return resolve();
        }
      }

      if (layer.type === 'text') {
        // text layer
        ctx.font = `${scaled(layer.size)}px "JetBrains Mono"`;
        ctx.textBaseline = "top";
        ctx.textAlign = layer.hAlign;
        ctx.letterSpacing = '0px';

        const titlePadding = 46;
        const maxTitleWidth = targetWidth - (titlePadding * 2);

        const lines = formatTitle(layer.text, scaled(maxTitleWidth), ctx as unknown as CanvasRenderingContext2D);
        const lineHeight = scaled(layer.size * 1.2);
        const linesHeight = lines.length * lineHeight;

        let left = 0;
        switch (layer.hAlign) {
          case 'left':
            left = titlePadding;
            break;
          case 'center':
            left = targetWidth / 2;
            break;
          case 'right':
            left = targetWidth - titlePadding;
            break;
        }

        let top = 0;
        switch (layer.vAlign) {
          case 'top':
            top = scaled(titlePadding);
            break;
          case 'middle':
            top = scaled(targetHeight / 2) - (linesHeight / 2);
            break;
          case 'bottom':
            top = scaled(targetHeight - titlePadding) - linesHeight;
            break;
        }

        // draw highlight
        if (layer.highlightColor) {
          lines.forEach((line, i) => {
            if (!layer.highlightColor) {
              return;
            }

            const highlightPadding = scaled(layer.size * 0.2);
            const lineWidth = ctx.measureText(line).width + (highlightPadding * 2);

            let highlightLeft = 0;
            switch (layer.hAlign) {
              case 'left':
                highlightLeft = scaled(left) - highlightPadding;
                break;
              case 'center':
                highlightLeft = scaled(targetWidth / 2) - (lineWidth / 2);
                break;
              case 'right':
                highlightLeft = scaled(left) + highlightPadding - lineWidth;
                break;
            }

            ctx.fillStyle = layer.highlightColor;
            ctx.fillRect(
              highlightLeft,
              // line distance - padding - extra line height
              (top + (i * lineHeight)) - highlightPadding - scaled(layer.size * 0.1),
              lineWidth,
              lineHeight + (highlightPadding * 2),
            );
          });
        }

        // draw text
        lines.forEach((line, i) => {
          ctx.fillStyle = layer.color;
          ctx.fillText(
            line,
            scaled(left),
            top + (i * lineHeight),
          );
        });

        return resolve();
      }

      return resolve();
    });
  });

  // execute all promise functions in series
  return promises.reduce((acc, p) => acc.then(() => p()), Promise.resolve());
}

export function renderCanvas(canvas: HTMLCanvasElement, config: RenderConfig): Promise<void> {
  // set canvas to correct size
  const canvasRect = canvas.getBoundingClientRect();
  canvas.width = canvasRect.width;
  canvas.height = canvasRect.height;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No canvas ctx available');
  }

  const layers: RenderLayer[] = [
    {
      type: 'text',
      color: config.title.color,
      text: 'Hallo met Ad, alles goed? Ik hoop van wel.',
      size: 72,
      vAlign: config.title.vAlign,
      hAlign: config.title.hAlign,
      highlightColor: config.title.highlightColor,
    },
    {
      type: 'background',
      color: config.background.color,
      image: config.background.image,
    },
  ];

  return renderLayers(layers, ctx, config);
}
