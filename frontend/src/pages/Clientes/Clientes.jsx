import { useState, useEffect } from 'react';
import ClienteTable from '../../components/organisms/ClienteTable/ClienteTable';
import ClienteModal from '../../components/organisms/ClienteModal/ClienteModal';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from '../../services/clienteService';
import styles from './Clientes.module.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [modalKey, setModalKey] = useState(0);

  const carregarClientes = async () => {
    try {
      const res = await listarClientes();
      setClientes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarClientes();
  }, []);

  const handleSalvar = async (form) => {
    if (clienteEditando) {
      await atualizarCliente(clienteEditando.id, form);
    } else {
      await criarCliente(form);
    }
    setModalAberto(false);
    setClienteEditando(null);
    carregarClientes();
  };

  const handleEditar = (cliente) => {
    setClienteEditando(cliente);
    setModalAberto(true);
    setModalKey((k) => k + 1);
  };

  const handleRemover = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este cliente?')) {
      await deletarCliente(id);
      carregarClientes();
    }
  };

  const handleNovo = () => {
    setClienteEditando(null);
    setModalAberto(true);
    setModalKey((k) => k + 1);
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Clientes</h1>
          <p>{clientes.length} clientes cadastrados</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <ClienteTable
        clientes={clientesFiltrados}
        onNovo={handleNovo}
        onEditar={handleEditar}
        onRemover={handleRemover}
      />

      <ClienteModal
        key={modalKey}
        aberto={modalAberto}
        onFechar={() => {
          setModalAberto(false);
          setClienteEditando(null);
        }}
        onSalvar={handleSalvar}
        clienteEditando={clienteEditando}
      />
    </div>
  );
}

export default Clientes;
