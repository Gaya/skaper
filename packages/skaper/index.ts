import formatTitle from './lib/formatTitle';

export type ImageSize = 'og' | 'twitter';
export type HAlign = 'left' | 'center' | 'right';
export type VAlign = 'top' | 'middle' | 'bottom';

interface BackgroundLayer {
  type: 'background';
  color: string;
}

interface TextLayer {
  type: 'text';
  color: string;
  size: number;
  text: string;
  vAlign: VAlign;
  hAlign: HAlign;
}

type RenderLayer = BackgroundLayer | TextLayer;

interface RenderConfig {
  imageSize: ImageSize;
  title: {
    color: string;
    letterSpacing: number;
    hAlign: HAlign;
    vAlign: VAlign;
  };
}

function imageSizeToDimensions(size: RenderConfig['imageSize']) {
  if (size === 'twitter') {
    return [1200, 675];
  }

  return [1200, 630];
}

function renderLayers(
  layers: RenderLayer[],
  ctx: CanvasRenderingContext2D,
  config: RenderConfig,
) {
  const [targetWidth, targetHeight] = imageSizeToDimensions(config.imageSize);
  const canvasRect = ctx.canvas.getBoundingClientRect();
  const canvasWidth = canvasRect.width;

  const scaled = (n: number) => n / (targetWidth / canvasWidth);

  layers.reverse().forEach((layer) => {
    if (layer.type === 'background') {
      // background layer
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, scaled(targetWidth), scaled(targetHeight));
    }

    if (layer.type === 'text') {
      // text layer
      ctx.font = `${scaled(layer.size)}px "JetBrains Mono"`;
      ctx.textAlign = layer.hAlign;
      ctx.textBaseline = "top";
      ctx.letterSpacing = '0px';
      ctx.fillStyle = layer.color;

      const titlePadding = 46;
      const maxTitleWidth = targetWidth - (titlePadding * 2);

      const lines = formatTitle(layer.text, scaled(maxTitleWidth), ctx as unknown as CanvasRenderingContext2D);
      const lineHeight = ctx.measureText('lineHeight').emHeightDescent;
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

      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          scaled(left),
          top + (i * lineHeight),
        );
      });
    }
  });
}

export function renderCanvas(canvas: HTMLCanvasElement, config: RenderConfig) {
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
    },
    {
      type: 'background',
      color: '#000',
    },
  ];

  renderLayers(layers, ctx, config);
}
