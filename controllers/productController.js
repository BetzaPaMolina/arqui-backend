const db = require('../db');

// --- CREATE ---
// Crear un nuevo producto (POST /api/products)
exports.createProduct = async (req, res) => {
  const { name, description, price, category_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO products (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};


exports.getProducts = async (req, res) => { 
    try {
        const result = await db.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

exports.countProducts = async (req, res) => {
    try {
      const result = await db.query('SELECT COUNT(*) FROM products');
      res.status(200).json({ total: parseInt(result.rows[0].count) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al contar los productos' });
    }
  };

//sumatoria del costo de todos los productos
exports.sumProductPrices = async (req, res) => {
    try {
      const result = await db.query('SELECT SUM(price) FROM products');
      res.status(200).json({ total: parseFloat(result.rows[0].sum) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al sumar los precios' });
    }
  };
  
 //
 exports.getProductsByCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM products WHERE category_id = $1', [id]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
  };
  

// --- READ ---
// Obtener todos los productos (GET /api/products)


