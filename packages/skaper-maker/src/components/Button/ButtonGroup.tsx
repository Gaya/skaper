import { PropsWithChildren } from 'preact/compat';

import './ButtonGroup.css';

function ButtonGroup({ children }: PropsWithChildren) {
  return (
    <div className="ButtonGroup">{children}</div>
  );
}

export default ButtonGroup;
