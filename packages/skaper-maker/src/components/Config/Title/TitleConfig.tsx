import TitleColor from './TitleColor';
import TitlePosition from './TitlePosition';
import TitleHighlightColor from './TitleHighlightColor';
import TitleFont from './TitleFont';
import TitleSize from './TitleSize';

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
        <TitleSize />
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
