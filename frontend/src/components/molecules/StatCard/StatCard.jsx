import styles from './StatCard.module.css';

function StatCard({ label, value, sub, highlight = false }) {
  return (
    <div className={[styles.card, highlight ? styles.highlight : ''].join(' ')}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

export default StatCard;
