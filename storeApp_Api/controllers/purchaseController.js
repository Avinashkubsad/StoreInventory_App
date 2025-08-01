// const pool = require('../db');

// exports.createPurchase = async (req, res, next) => {
//   const { customer_name, items, shipping_address } = req.body;
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     const purchaseResult = await client.query(
//       'INSERT INTO purchases(customer_name, date) VALUES($1, CURRENT_DATE) RETURNING id',
//       [customer_name]
//     );
//     const purchaseId = purchaseResult.rows[0].id;

//     for (const item of items) {
//       await client.query(
//         'INSERT INTO purchase_items(purchase_id, item_id, quantity) VALUES($1, $2, $3)',
//         [purchaseId, item.item_id, item.quantity]
//       );
//       await client.query(
//         'UPDATE items SET stock = stock - $1 WHERE id = $2',
//         [item.quantity, item.item_id]
//       );
//     }

//     await client.query(
//       'INSERT INTO shipping(purchase_id, shipping_address, status) VALUES($1, $2, $3)',
//       [purchaseId, shipping_address, 'Pending']
//     );

//     await client.query('COMMIT');
//     res.json({ message: 'Purchase successful' });
//   } catch (err) {
//     await client.query('ROLLBACK');
//     next(err);
//   } finally {
//     client.release();
//   }
// };

// exports.getPurchaseDetails = async (req, res, next) => {
//   try {
//     const result = await pool.query(`
//       SELECT p.id AS purchase_id, p.customer_name, p.date,
//              i.name AS item_name, pi.quantity, i.price,
//              s.shipping_address, s.status
//       FROM purchases p
//       JOIN purchase_items pi ON p.id = pi.purchase_id
//       JOIN items i ON i.id = pi.item_id
//       JOIN shipping s ON p.id = s.purchase_id
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// };

const pool = require("../db");
exports.submitPurchase = async (req, res) => {
  const { customer, cart } = req.body;
  console.log("Received body:", req.body);

  try {
    await pool.query("BEGIN");

    // Insert into purchases table with name, email, and phone
    const purchaseRes = await pool.query(
      "INSERT INTO purchases (customer_name, customer_email, customer_phone) VALUES ($1, $2, $3) RETURNING id",
      [customer.name, customer.email, customer.phone]
    );
    const purchaseId = purchaseRes.rows[0].id;

    for (let item of cart) {
      // Insert into purchase_items
      await pool.query(
        `INSERT INTO purchases (customer_name, customer_email, customer_phone)
   VALUES ($1, $2, $3) RETURNING id`,
        [customer.name, customer.email, customer.phone]
      );

      // Update stock
      await pool.query(`UPDATE items SET stock = stock - $1 WHERE id = $2`, [
        item.quantity,
        item.id,
      ]);
    }

    await pool.query("COMMIT");
    res.json({ message: "Purchase submitted successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error submitting purchase:", err);
    res.status(500).json({ error: err.message });
  }
};
