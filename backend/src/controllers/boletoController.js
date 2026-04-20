const db = require('../config/db');

const listarBoletos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT b.*, c.nome, c.email 
      FROM boletos b
      JOIN clientes c ON b.cliente_id = c.id
      ORDER BY b.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar boletos' });
  }
};

const criarBoleto = async (req, res) => {
  try {
    const { cliente_id, valor, vencimento } = req.body;

    const [clientes] = await db.query('SELECT * FROM clientes WHERE id=?', [
      cliente_id,
    ]);
    if (clientes.length === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    const cliente = clientes[0];

    const [result] = await db.query(
      'INSERT INTO boletos (cliente_id, valor, vencimento, status) VALUES (?, ?, ?, ?)',
      [cliente_id, valor, vencimento, 'pendente'],
    );

    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: cliente.nome,
        email: cliente.email,
        valor,
        vencimento,
      }),
    });

    await db.query('UPDATE boletos SET status=? WHERE id=?', [
      'enviado',
      result.insertId,
    ]);

    res
      .status(201)
      .json({
        id: result.insertId,
        cliente_id,
        valor,
        vencimento,
        status: 'enviado',
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar boleto' });
  }
};

const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query('UPDATE boletos SET status=? WHERE id=?', [status, id]);
    res.json({ id, status });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
};

module.exports = { listarBoletos, criarBoleto, atualizarStatus };
