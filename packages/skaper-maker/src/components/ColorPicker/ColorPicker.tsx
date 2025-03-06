import './ColorPicker.css';

interface ColorPickerProps {
  value: string;
  onChange?: (color: string) => void;
}

function ColorPicker({ value, onChange = undefined }: ColorPickerProps) {
  return (
    <input
      className="ColorPicker"
      type="color"
      value={value}
      onInput={(e) => onChange && 'value' in e.target && typeof e.target.value === 'string' && onChange(e.target.value)}
    />
  );
}

export default ColorPicker;
