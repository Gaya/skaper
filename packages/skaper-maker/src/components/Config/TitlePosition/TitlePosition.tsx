import { useAppState } from '@/components/Skaper/AppState';
import Button from '@/components/Button/Button';
import ButtonGroup from '@/components/Button/ButtonGroup';

import AlignLeftIcon from './AlignLeft.icon';
import AlignCenterIcon from './AlignCenter.icon';
import AlignRightIcon from './AlignRight.icon';
import AlignTopIcon from './AlignTop.icon';
import AlignMiddleIcon from './AlignMiddle.icon';
import AlignBottomIcon from './AlignBottom.icon';

import './TitlePosition.css';

function TitlePosition() {
  const { titleHAlign, titleVAlign } = useAppState();

  return (
    <div className="TitlePosition">
      <h2>
        Title alignment
      </h2>

      <div className="ButtonGroups">
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

        <ButtonGroup>
          <Button
            active={titleVAlign.value === 'top'}
            title="Align top"
            onClick={() => { titleVAlign.value = 'top'; }}
          >
            <AlignTopIcon />
          </Button>
          <Button
            active={titleVAlign.value === 'middle'}
            title="Align middle"
            onClick={() => { titleVAlign.value = 'middle'; }}
          >
            <AlignMiddleIcon />
          </Button>
          <Button
            active={titleVAlign.value === 'bottom'}
            title="Align bottom"
            onClick={() => { titleVAlign.value = 'bottom'; }}
          >
            <AlignBottomIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default TitlePosition;
