import { useState, useEffect } from 'react';
import StatCard from '../../components/molecules/StatCard/StatCard';
import BoletoTable from '../../components/organisms/BoletoTable/BoletoTable';
import BoletoModal from '../../components/organisms/BoletoModal/BoletoModal';
import { listarBoletos, criarBoleto } from '../../services/boletoService';
import { listarClientes } from '../../services/clienteService';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [boletos, setBoletos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const carregarDados = async () => {
    try {
      const [resBoletos, resClientes] = await Promise.all([
        listarBoletos(),
        listarClientes(),
      ]);
      setBoletos(Array.isArray(resBoletos.data) ? resBoletos.data : []);
      setClientes(Array.isArray(resClientes.data) ? resClientes.data : []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarDados();
  }, []);

  const handleEmitir = async (form) => {
    await criarBoleto(form);
    setModalAberto(false);
    carregarDados();
  };

  const totalReceita = boletos

    .filter((b) => b.status === 'pago')
    .reduce((acc, b) => acc + Number(b.valor), 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const totalPendentes = boletos.filter((b) => b.status === 'pendente').length;
  const totalEnviados = boletos.filter((b) => b.status === 'enviado').length;

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.page}>
      <div className={styles.greeting}>
        <h1>Bom dia!</h1>
        <p>{hoje}</p>
      </div>

      <div className={styles.metrics}>
        <StatCard
          label="Receita do mês"
          value={totalReceita}
          sub="boletos pagos"
          highlight
        />
        <StatCard
          label="Clientes ativos"
          value={clientes.length}
          sub="cadastrados no sistema"
        />
        <StatCard
          label="Aguardando pagamento"
          value={totalPendentes}
          sub="em aberto"
        />
        <StatCard
          label="Enviados"
          value={totalEnviados}
          sub="via e-mail automático"
        />
      </div>

      <BoletoTable
        boletos={boletos.slice(0, 5)}
        onNovo={() => setModalAberto(true)}
      />

      <BoletoModal
        key={String(modalAberto)}
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onEmitir={handleEmitir}
        clientes={clientes}
      />
    </div>
  );
}

export default Dashboard;
