import TitlePosition from './TitlePosition/TitlePosition';

import './Config.css';

function Config() {
  return (
    <aside className="Config">
      <fieldset>
        <legend>Title</legend>
        <TitlePosition />
      </fieldset>
    </aside>
  );
}

export default Config;
