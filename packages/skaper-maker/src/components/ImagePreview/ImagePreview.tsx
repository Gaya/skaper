import classNames from 'classnames';

import { useAppState } from '@/components/Skaper/AppState';

import ImageSize from './ImageSize';

import './ImagePreview.css';

function ImagePreview() {
  const { imageSize } = useAppState();

  return (
    <section className="ImagePreview">
      <ImageSize />
      <div className={classNames('Image', { Twitter: imageSize.value === 'twitter' })} />
    </section>
  );
}

export default ImagePreview;
