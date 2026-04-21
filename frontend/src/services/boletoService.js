import api from './api';

export const listarBoletos = () => api.get('/boletos');
export const criarBoleto = (data) => api.post('/boletos', data);
export const atualizarStatus = (id, status) =>
  api.put(`/boletos/${id}/status`, { status });
