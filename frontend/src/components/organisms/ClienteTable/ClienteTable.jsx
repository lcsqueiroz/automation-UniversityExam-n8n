import Avatar from '../../atoms/Avatar/Avatar';
import Button from '../../atoms/Button/Button';
import styles from './ClienteTable.module.css';

function ClienteTable({ clientes, onNovo, onEditar, onRemover }) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.title}>Clientes cadastrados</span>
        <Button onClick={onNovo}>+ Novo cliente</Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Cadastrado em</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.empty}>
                Nenhum cliente cadastrado ainda.
              </td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>
                  <Avatar size="sm" color="blue" />
                </td>
                <td>
                  <div className={styles.clienteName}>{cliente.nome}</div>
                  <div className={styles.clienteEmail}>{cliente.email}</div>
                </td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>
                  {new Date(cliente.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEditar(cliente)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemover(cliente.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClienteTable;
