import { useAppState } from '@/components/Skaper/AppState';
import Button from '@/components/Button/Button';

import UploadIcon from './Upload.icon';

function BackgroundImage() {
  const { background } = useAppState();

  return (
    <div className="Horizontal">
      <h3>Image</h3>
      <Button title="Add image">
        <UploadIcon />
        Add image
      </Button>
    </div>
  );
}

export default BackgroundImage;
