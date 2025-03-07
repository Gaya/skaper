import { useCallback } from 'preact/hooks';

import RemoveIcon from '@/icons/Remove.icon';
import UploadIcon from '@/icons/Upload.icon';

import { useAppState } from '@/components/Skaper/AppState';
import Button from '@/components/Button/Button';

import './BackgroundImage.css';

function BackgroundImage() {
  const { background } = useAppState();

  const triggerUpload = useCallback(() => {
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = 'image';

    uploadInput.addEventListener('change', () => {
      const files = Array.from(uploadInput.files);
      background.image.value = URL.createObjectURL(files[0]);
    });

    uploadInput.click();
  }, [background.image]);

  return (
    <div className="BackgroundImage Horizontal">
      <h3>Image</h3>
      {background.image.value && (
        <div className="BackgroundImagePreview">
          <Button title="Remove image" icon onClick={() => { background.image.value = undefined; }}>
            <RemoveIcon />
          </Button>
          <picture className="UploadPreview">
            <img src={background.image.value} alt="" />
          </picture>
        </div>
      )}
      {!background.image.value && (
        <Button title="Add image" onClick={triggerUpload}>
          <UploadIcon />
          Add image
        </Button>
      )}
    </div>
  );
}

export default BackgroundImage;
