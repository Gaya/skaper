import TitlePosition from './TitlePosition/TitlePosition';
import TitleColor from './TitleColor/TitleColor';
import TitleHighlightColor from './TitleHighlightColor/TitleHighlightColor';

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
      <fieldset>
        <TitleHighlightColor />
      </fieldset>
    </aside>
  );
}

export default Config;
