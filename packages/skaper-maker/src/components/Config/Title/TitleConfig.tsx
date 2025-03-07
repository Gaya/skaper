import TitleColor from './TitleColor';
import TitlePosition from './TitlePosition/TitlePosition';
import TitleHighlightColor from './TitleHighlightColor';

function TitleConfig() {
  return (
    <>
      <h2>
        Title
      </h2>
      <fieldset>
        <TitleColor />
      </fieldset>
      <fieldset>
        <TitlePosition />
      </fieldset>
      <fieldset>
        <TitleHighlightColor />
      </fieldset>
    </>
  );
}

export default TitleConfig;
