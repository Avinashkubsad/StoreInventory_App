// const pool = require("../db");

// exports.getAllItems = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT i.id, i.name, i.stock, t.name AS type
//       FROM items i
//       JOIN item_types t ON i.type_id = t.id
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const pool = require("../db");

exports.getAllItems = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.id, i.name, i.stock, t.name AS type
      FROM items i
      JOIN item_types t ON i.type_id = t.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
