import { useId } from 'preact/hooks';

import './Toggle.css';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ value, onChange }: ToggleProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="Toggle">
      <span>{value ? 'Enabled' : 'Disabled'}</span>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange('checked' in e.target && !!e.target.checked)}
      />
    </label>
  );
}

export default Toggle;
