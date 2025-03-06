import classNames from 'classnames';
import { skaperTest } from 'skaper';

import { useAppState } from '@/components/Skaper/AppState';

import ImageSize from './ImageSize';

import './ImagePreview.css';

function ImagePreview() {
  const { imageSize, title } = useAppState();

  skaperTest();

  return (
    <section className="ImagePreview">
      <div className={classNames('Image', { Twitter: imageSize.value === 'twitter' })}>
        <h3 style={{ color: title.color.value }}>Hallo met title</h3>
      </div>
      <ImageSize />
    </section>
  );
}

export default ImagePreview;
