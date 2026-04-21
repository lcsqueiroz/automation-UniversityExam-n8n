import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';
import styles from './BoletoTable.module.css';

function BoletoTable({ boletos, onNovo }) {
  const formatarData = (data) => {
    if (!data) return '-';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor) => {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.title}>Boletos emitidos</span>
        <Button onClick={onNovo}>+ Emitir boleto</Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {boletos.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.empty}>
                Nenhum boleto emitido ainda.
              </td>
            </tr>
          ) : (
            boletos.map((boleto) => (
              <tr key={boleto.id}>
                <td>
                  <span className={styles.numeroBoleto}>
                    {String(boleto.id).padStart(4, '0')}
                  </span>
                </td>
                <td>
                  <div className={styles.clienteName}>{boleto.nome}</div>
                  <div className={styles.clienteEmail}>{boleto.email}</div>
                </td>
                <td>{formatarValor(boleto.valor)}</td>
                <td>{formatarData(boleto.vencimento)}</td>
                <td>
                  <Badge status={boleto.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BoletoTable;
