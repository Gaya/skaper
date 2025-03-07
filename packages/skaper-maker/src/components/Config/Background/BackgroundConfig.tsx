import BackgroundColor from './BackgroundColor';
import BackgroundImage from './BackgroundImage';

function BackgroundConfig() {
  return (
    <>
      <h2>Background</h2>
      <fieldset>
        <BackgroundImage />
      </fieldset>
      <fieldset>
        <BackgroundColor />
      </fieldset>
    </>
  );
}

export default BackgroundConfig;
