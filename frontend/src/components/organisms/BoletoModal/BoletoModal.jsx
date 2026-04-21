import { useState } from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import styles from './BoletoModal.module.css';

const INITIAL_FORM = { cliente_id: '', valor: '', vencimento: '' };

function BoletoModal({ aberto, onFechar, onEmitir, clientes }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmitir = async () => {
    setLoading(true);
    await onEmitir(form);
    setLoading(false);
  };

  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Emitir boleto</span>
          <button className={styles.close} onClick={onFechar}>
            ×
          </button>
        </div>
        <div className={styles.body}>
          <div>
            <label className={styles.label}>Cliente</label>
            <select
              className={styles.select}
              name="cliente_id"
              value={form.cliente_id}
              onChange={handleChange}
            >
              <option value="">Selecione um cliente...</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <Input
              label="Valor (R$)"
              name="valor"
              placeholder="0,00"
              value={form.valor}
              onChange={handleChange}
            />
            <Input
              label="Vencimento"
              name="vencimento"
              placeholder="DD/MM/AAAA"
              value={form.vencimento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button variant="secondary" onClick={onFechar}>
            Cancelar
          </Button>
          <Button onClick={handleEmitir} disabled={loading}>
            {loading ? 'Enviando...' : 'Emitir e enviar'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BoletoModal;
