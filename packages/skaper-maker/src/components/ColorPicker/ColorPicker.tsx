import './ColorPicker.css';

interface ColorPickerProps {
  value: string;
  enabled?: boolean;
  onChange?: (color: string) => void;
}

function ColorPicker({ value, onChange = undefined, enabled = true }: ColorPickerProps) {
  return (
    <input
      disabled={!enabled}
      className="ColorPicker"
      type="color"
      value={value}
      onInput={(e) => onChange && 'value' in e.target && typeof e.target.value === 'string' && onChange(e.target.value)}
    />
  );
}

export default ColorPicker;
