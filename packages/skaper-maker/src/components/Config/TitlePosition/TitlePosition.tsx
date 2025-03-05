import { useAppState } from '@/components/Skaper/AppState';
import Button from '@/components/Button/Button';
import ButtonGroup from '@/components/Button/ButtonGroup';

import AlignLeftIcon from './AlignLeft.icon';
import AlignCenterIcon from './AlignCenter.icon';
import AlignRightIcon from './AlignRight.icon';

import './TitlePosition.css';

function TitlePosition() {
  const { titleHAlign } = useAppState();

  return (
    <div className="TitlePosition">
      <label>
        Alignment
      </label>

      <ButtonGroup>
        <Button
          active={titleHAlign.value === 'left'}
          title="Align left"
          onClick={() => { titleHAlign.value = 'left'; }}
        >
          <AlignLeftIcon />
        </Button>
        <Button
          active={titleHAlign.value === 'center'}
          title="Align center"
          onClick={() => { titleHAlign.value = 'center'; }}
        >
          <AlignCenterIcon />
        </Button>
        <Button
          active={titleHAlign.value === 'right'}
          title="Align right"
          onClick={() => { titleHAlign.value = 'right'; }}
        >
          <AlignRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TitlePosition;
