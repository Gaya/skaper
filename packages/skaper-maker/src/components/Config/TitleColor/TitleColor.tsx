import { useAppState } from '@/components/Skaper/AppState';
import ColorPicker from '@/components/ColorPicker/ColorPicker';

import './TitleColor.css';

function TitleColor() {
  const { title } = useAppState();

  return (
    <div className="TitleColor">
      <h2>Color</h2>
      <ColorPicker value={title.color.value} onChange={(color) => { title.color.value = color; }} />
    </div>
  );
}

export default TitleColor;
