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
      onChange={(e) => onChange && 'value' in e.target && onChange(e.target.value.toString())}
    />
  );
}

export default ColorPicker;
