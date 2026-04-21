import styles from './FormGroup.module.css';

function FormGroup({ children, row = false }) {
  return <div className={row ? styles.row : styles.group}>{children}</div>;
}

export default FormGroup;
