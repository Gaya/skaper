import TitleColor from './TitleColor';
import TitlePosition from './TitlePosition/TitlePosition';
import TitleHighlightColor from './TitleHighlightColor';

function TitleConfig() {
  return (
    <>
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
