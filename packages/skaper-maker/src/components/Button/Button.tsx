import { PropsWithChildren } from 'preact/compat';
import classNames from 'classnames';

import './Button.css';

interface ButtonProps {
  title: string;
  icon?: boolean;
  size?: 'small' | 'default' | 'large';
  active?: boolean;
  onClick?: () => void;
}

function Button({
  title,
  children,
  active = false,
  icon = false,
  size = 'default',
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        'Button',
        {
          '--icon': icon,
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
