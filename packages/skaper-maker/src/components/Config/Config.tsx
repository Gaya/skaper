import { useState } from 'preact/hooks';

import BackgroundIcon from '@/icons/Background.icon';
import TitleIcon from '@/icons/Title.icon';

import TitleConfig from './Title/TitleConfig';
import BackgroundConfig from './Background/BackgroundConfig';

import './Config.css';

function Config() {
  const [page, setPage] = useState('title');

  return (
    <aside className="Config">
      <menu className="ConfigSidebar">
        <li>
          <button
            type="button"
            className={page === 'title' ? '--active' : undefined}
            onClick={() => setPage('title')}
            title="Title"
          >
            <TitleIcon />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setPage('background')}
            className={page === 'background' ? '--active' : undefined}
            title="Background"
          >
            <BackgroundIcon />
          </button>
        </li>
      </menu>
      <section className="ConfigContent">
        {page === 'title' && <TitleConfig />}
        {page === 'background' && <BackgroundConfig />}
      </section>
    </aside>
  );
}

export default Config;
