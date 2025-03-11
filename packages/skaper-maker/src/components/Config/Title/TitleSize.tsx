import TitleIcon from '@/icons/Title.icon';

import './TitleSize.css';

function TitleSize() {
  return (
    <div className="Horizontal">
      <h3>Size</h3>
      <div className="TitleSizeInput">
        <TitleIcon />
        <input type="range" min={12} max={200} />
        <TitleIcon />
      </div>
    </div>
  );
}

export default TitleSize;
