import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);
function Button({
  to,
  disabled = false,
  primary = false,
  text = false,
  outline = false,
  small = false,
  large = false,
  rounded = false,
  square = false,
  href,
  leftIcon,
  rightIcon,
  className,
  children,

  onClick,

  ...passprops
}) {
  let Comp = 'button';

  const props = {
    onClick,
    ...passprops,
  };
  if (disabled) {
    Object.keys(props).forEach(key => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    square,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
