import { useId } from 'preact/hooks';

import { useAppState } from '@/components/Skaper/AppState';

import './ImageSize.css';

function ImageSize() {
  const { imageSize } = useAppState();
  const id = useId();

  return (
    <fieldset className="ImageSize">
      <label htmlFor={id}>
        Image Size:
        <div className="skaper-input-container">
          <select
            name="skaper-size"
            id={id}
            value={imageSize}
            onChange={(e) => {
              const newValue = (e.target as HTMLSelectElement).value;
              imageSize.value = newValue === 'og' ? 'og' : 'twitter';
            }}
          >
            <option value="og">1200 × 630 (og:image)</option>
            <option value="twitter">1200 × 675 (twitter:image)</option>
          </select>
        </div>
      </label>
    </fieldset>
  );
}

export default ImageSize;
