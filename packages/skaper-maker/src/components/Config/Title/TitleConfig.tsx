import TitleColor from './TitleColor';
import TitlePosition from './TitlePosition';
import TitleHighlightColor from './TitleHighlightColor';
import TitleFont from './TitleFont';

function TitleConfig() {
  return (
    <>
      <h2>
        Title
      </h2>
      <fieldset>
        <TitleFont />
      </fieldset>
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
