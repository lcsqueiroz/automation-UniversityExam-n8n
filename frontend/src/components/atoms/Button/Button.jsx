import styles from './Button.module.css';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        full ? styles.full : '',
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
