import TitlePosition from './TitlePosition/TitlePosition';
import TitleColor from './TitleColor/TitleColor';

import './Config.css';

function Config() {
  return (
    <aside className="Config">
      <fieldset>
        <TitleColor />
      </fieldset>
      <fieldset>
        <TitlePosition />
      </fieldset>
    </aside>
  );
}

export default Config;
