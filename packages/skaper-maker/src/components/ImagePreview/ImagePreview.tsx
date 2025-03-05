import classNames from 'classnames';

import { useAppState } from '@/components/Skaper/AppState';

import ImageSize from './ImageSize';

import './ImagePreview.css';

function ImagePreview() {
  const { imageSize } = useAppState();

  return (
    <section className="ImagePreview">
      <div className={classNames('Image', { Twitter: imageSize.value === 'twitter' })} />
      <ImageSize />
    </section>
  );
}

export default ImagePreview;
