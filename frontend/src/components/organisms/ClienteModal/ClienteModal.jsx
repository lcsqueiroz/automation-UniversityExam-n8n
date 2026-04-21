import { useState } from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import styles from './ClienteModal.module.css';

const INITIAL_FORM = { nome: '', email: '', cpf: '', telefone: '' };

function ClienteModal({ aberto, onFechar, onSalvar, clienteEditando }) {
  const [form, setForm] = useState(clienteEditando ?? INITIAL_FORM);

  const mascararCPF = (valor) => {
    return valor
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const mascararTelefone = (valor) => {
    return valor
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;
    if (name === 'cpf') novoValor = mascararCPF(value);
    if (name === 'telefone') novoValor = mascararTelefone(value);
    setForm((prev) => ({ ...prev, [name]: novoValor }));
  };

  const handleSalvar = () => {
    onSalvar(form);
  };

  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>
            {clienteEditando ? 'Editar cliente' : 'Novo cliente'}
          </span>
          <button className={styles.close} onClick={onFechar}>
            ×
          </button>
        </div>
        <div className={styles.body}>
          <Input
            label="Nome completo"
            name="nome"
            placeholder="Ex: João Silva"
            value={form.nome}
            onChange={handleChange}
          />
          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="Ex: joao@email.com"
            value={form.email}
            onChange={handleChange}
          />
          <div className={styles.row}>
            <Input
              label="CPF"
              name="cpf"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={handleChange}
            />
            <Input
              label="Telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button variant="secondary" onClick={onFechar}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar}>Salvar cliente</Button>
        </div>
      </div>
    </div>
  );
}

export default ClienteModal;
