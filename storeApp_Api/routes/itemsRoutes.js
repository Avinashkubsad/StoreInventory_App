// const express = require('express');
// const router = express.Router();
// const pool = require('../db'); // pg client pool

// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         items.id,
//         items.name AS item_name,
//         item_types.name AS type_name,
//         items.stock
//       FROM items
//       JOIN item_types ON items.type_id = item_types.id
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { getAllItems } = require("../controllers/itemController");

router.get("/", getAllItems);
module.exports = router;
