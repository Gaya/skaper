import { useAppState } from '@/components/Skaper/AppState';
import ColorPicker from '@/components/ColorPicker/ColorPicker';
import Toggle from '@/components/Toggle/Toggle';

import './TitleHighlightColor.css';

function TitleHighlightColor() {
  const { title } = useAppState();

  return (
    <div className="TitleHighlightColor Horizontal">
      <h2>Highlight Color</h2>
      <div className="ToggleGroup">
        <Toggle
          value={title.enableHighlight.value}
          onChange={(v) => { title.enableHighlight.value = v; }}
        />
        <ColorPicker
          enabled={title.enableHighlight.value}
          value={title.highlightColor.value}
          onChange={(color) => { title.highlightColor.value = color; }}
        />
      </div>
    </div>
  );
}

export default TitleHighlightColor;
