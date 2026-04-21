import { useState, useEffect } from 'react';
import BoletoTable from '../../components/organisms/BoletoTable/BoletoTable';
import BoletoModal from '../../components/organisms/BoletoModal/BoletoModal';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import { listarBoletos, criarBoleto } from '../../services/boletoService';
import { listarClientes } from '../../services/clienteService';
import styles from './Boletos.module.css';

const FILTROS = ['todos', 'enviado', 'pendente', 'pago'];

function Boletos() {
  const [boletos, setBoletos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');
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

  const boletosFiltrados = boletos
    .filter((b) => filtro === 'todos' || b.status === filtro)
    .filter((b) => b.nome?.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Boletos</h1>
          <p>{boletos.length} boletos emitidos no total</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          placeholder="Buscar por cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {FILTROS.map((f) => (
          <button
            key={f}
            className={[
              styles.filterBtn,
              filtro === f ? styles.active : '',
            ].join(' ')}
            onClick={() => setFiltro(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <BoletoTable
        boletos={boletosFiltrados}
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

export default Boletos;
