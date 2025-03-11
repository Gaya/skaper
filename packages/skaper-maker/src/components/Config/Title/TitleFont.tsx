import { FONTS } from '@/common/fonts';
import { useAppState } from '@/components/Skaper/AppState';

function TitleFont() {
  const { title } = useAppState();

  return (
    <div className="Horizontal">
      <h3>Font</h3>
      <select
        name="font"
        id="title-font"
        value={title.font.value}
        onChange={(e) => {
          title.font.value = (e.target as HTMLSelectElement).value;
        }}
      >
        {Object.entries(FONTS).map(([key, font]) => (
          <option value={key} selected={title.font.value === key}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TitleFont;
