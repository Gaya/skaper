import { useAppState } from '@/components/Skaper/AppState';
import ColorPicker from '@/components/ColorPicker/ColorPicker';

function BackgroundColor() {
  const { background } = useAppState();

  return (
    <div className="Horizontal">
      <h3>Color</h3>
      <ColorPicker
        value={background.color.value}
        onChange={(color) => { background.color.value = color; }}
      />
    </div>
  );
}

export default BackgroundColor;
