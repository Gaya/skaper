import AlignLeftIcon from '@/icons/AlignLeft.icon';
import AlignCenterIcon from '@/icons/AlignCenter.icon';
import AlignRightIcon from '@/icons/AlignRight.icon';
import AlignTopIcon from '@/icons/AlignTop.icon';
import AlignMiddleIcon from '@/icons/AlignMiddle.icon';
import AlignBottomIcon from '@/icons/AlignBottom.icon';

import { useAppState } from '@/components/Skaper/AppState';
import Button from '@/components/Button/Button';
import ButtonGroup from '@/components/Button/ButtonGroup';

import './TitlePosition.css';

function TitlePosition() {
  const { title } = useAppState();

  return (
    <div className="TitlePosition">
      <h3>
        Alignment
      </h3>

      <div className="ButtonGroups">
        <ButtonGroup>
          <Button
            icon
            active={title.hAlign.value === 'left'}
            title="Align left"
            onClick={() => { title.hAlign.value = 'left'; }}
          >
            <AlignLeftIcon />
          </Button>
          <Button
            icon
            active={title.hAlign.value === 'center'}
            title="Align center"
            onClick={() => { title.hAlign.value = 'center'; }}
          >
            <AlignCenterIcon />
          </Button>
          <Button
            icon
            active={title.hAlign.value === 'right'}
            title="Align right"
            onClick={() => { title.hAlign.value = 'right'; }}
          >
            <AlignRightIcon />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            icon
            active={title.vAlign.value === 'top'}
            title="Align top"
            onClick={() => { title.vAlign.value = 'top'; }}
          >
            <AlignTopIcon />
          </Button>
          <Button
            icon
            active={title.vAlign.value === 'middle'}
            title="Align middle"
            onClick={() => { title.vAlign.value = 'middle'; }}
          >
            <AlignMiddleIcon />
          </Button>
          <Button
            icon
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
