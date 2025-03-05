import { PropsWithChildren } from 'preact/compat';
import classNames from 'classnames';

import './Button.css';

interface ButtonProps {
  title: string;
  size?: 'small' | 'default' | 'large';
  active?: boolean;
  onClick?: () => void;
}

function Button({
  title,
  children,
  active = false,
  size = 'default',
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        'Button',
        {
          '--active': !!active,
          '--small': size === 'small',
          '--large': size === 'large',
        },
      )}
      type="button"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
