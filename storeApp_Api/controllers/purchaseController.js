
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
