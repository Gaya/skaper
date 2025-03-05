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
  const { title } = useAppState();

  return (
    <div className="TitlePosition">
      <h2>
        Alignment
      </h2>

      <div className="ButtonGroups">
        <ButtonGroup>
          <Button
            active={title.hAlign.value === 'left'}
            title="Align left"
            onClick={() => { title.hAlign.value = 'left'; }}
          >
            <AlignLeftIcon />
          </Button>
          <Button
            active={title.hAlign.value === 'center'}
            title="Align center"
            onClick={() => { title.hAlign.value = 'center'; }}
          >
            <AlignCenterIcon />
          </Button>
          <Button
            active={title.hAlign.value === 'right'}
            title="Align right"
            onClick={() => { title.hAlign.value = 'right'; }}
          >
            <AlignRightIcon />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            active={title.vAlign.value === 'top'}
            title="Align top"
            onClick={() => { title.vAlign.value = 'top'; }}
          >
            <AlignTopIcon />
          </Button>
          <Button
            active={title.vAlign.value === 'middle'}
            title="Align middle"
            onClick={() => { title.vAlign.value = 'middle'; }}
          >
            <AlignMiddleIcon />
          </Button>
          <Button
            active={title.vAlign.value === 'bottom'}
            title="Align bottom"
            onClick={() => { title.vAlign.value = 'bottom'; }}
          >
            <AlignBottomIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default TitlePosition;
