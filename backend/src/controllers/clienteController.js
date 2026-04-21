const db = require('../config/db');

const listarClientes = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM clientes ORDER BY created_at DESC',
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar clientes' });
  }
};

const criarCliente = async (req, res) => {
  try {
    const { nome, email, cpf, telefone } = req.body;
    const [result] = await db.query(
      'INSERT INTO clientes (nome, email, cpf, telefone) VALUES (?, ?, ?, ?)',
      [nome, email, cpf, telefone],
    );
    res.status(201).json({ id: result.insertId, nome, email, cpf, telefone });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar cliente' });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cpf, telefone } = req.body;
    await db.query(
      'UPDATE clientes SET nome=?, email=?, cpf=?, telefone=? WHERE id=?',
      [nome, email, cpf, telefone, id],
    );
    res.json({ id, nome, email, cpf, telefone });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM boletos WHERE cliente_id = ?', [id]);
    await db.query('DELETE FROM clientes WHERE id= ?', [id]);
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente' });
  }
};

module.exports = {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
};
