import { useEffect, useRef } from 'preact/hooks';
import classNames from 'classnames';
import { renderCanvas } from 'skaper';

import { useAppState } from '@/components/Skaper/AppState';
import { FONTS } from '@/common/fonts';

import ImageSize from './ImageSize';

import './ImagePreview.css';

function ImagePreview() {
  const { imageSize, title, background } = useAppState();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderCanvas(
        canvasRef.current,
        {
          imageSize: imageSize.value,
          background: {
            image: background.image.value || undefined,
            color: background.color.value,
          },
          title: {
            font: FONTS[title.font.value],
            color: title.color.value,
            letterSpacing: 0,
            vAlign: title.vAlign.value,
            hAlign: title.hAlign.value,
            highlightColor: title.enableHighlight.value ? title.highlightColor.value : undefined,
          },
        },
      ).then();
    }
  }, [
    background.color.value,
    background.image.value,
    imageSize.value,
    title.font.value,
    title.color.value,
    title.enableHighlight.value,
    title.hAlign.value,
    title.highlightColor.value,
    title.vAlign.value,
  ]);

  return (
    <section className="ImagePreview">
      <canvas ref={canvasRef} className={classNames('Image', { Twitter: imageSize.value === 'twitter' })} />
      <ImageSize />
    </section>
  );
}

export default ImagePreview;
