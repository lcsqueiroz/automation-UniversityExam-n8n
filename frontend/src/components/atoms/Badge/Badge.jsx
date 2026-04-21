import styles from './Badge.module.css';

const STATUS_LABEL = {
  enviado: 'Enviado',
  pago: 'Pago',
  pendente: 'Pendente',
};

function Badge({ status }) {
  return (
    <span className={[styles.badge, styles[status]].join(' ')}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export default Badge;
