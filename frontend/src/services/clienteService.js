import api from './api';

export const listarClientes = () => api.get('/clientes');
export const criarCliente = (data) => api.post('/clientes', data);
export const atualizarCliente = (id, data) => api.put(`/clientes/${id}`, data);
export const deletarCliente = (id) => api.delete(`/clientes/${id}`);
