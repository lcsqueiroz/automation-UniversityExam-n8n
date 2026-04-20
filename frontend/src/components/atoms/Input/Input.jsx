import styles from './Input.module.css';

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  name,
}) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[styles.input, error ? styles.error : ''].join(' ')}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}

export default Input;
