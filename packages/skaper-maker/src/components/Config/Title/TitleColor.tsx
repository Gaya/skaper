import { useAppState } from '@/components/Skaper/AppState';
import ColorPicker from '@/components/ColorPicker/ColorPicker';

function TitleColor() {
  const { title } = useAppState();

  return (
    <div className="Horizontal">
      <h3>Color</h3>
      <ColorPicker value={title.color.value} onChange={(color) => { title.color.value = color; }} />
    </div>
  );
}

export default TitleColor;
