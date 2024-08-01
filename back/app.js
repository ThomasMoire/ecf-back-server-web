const express = require('express');
const sequelize = require('./models');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const OrderProduct = require('./models/OrderProduct');
const Category = require('./models/Category');
const CategoryProduct = require('./models/CategoryProduct');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                attributes: ['title'] // Inclure seulement le nom de la catégorie
            }
        });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: "Aucun produit" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
    }
});

// Get product by id
app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: {
                model: Category,
                include: ['title']
            }
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json('Product not found with this id');
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get product by title
app.get("/product/search/:title", async (req, res) => {
    const text = req.params.text.toLowerCase();
    try {
        const products = await Product.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${text}%`
                }
            }
        });
        if(products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json('Product not found with entered title');
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des Produits."});
    }
});

// Create product
app.post("/product", async (req, res) => {
    const newProduct = req.body;

    // Vérifiez si le titre de la catégorie est spécifié
    if (!newProduct.Categorytitle) {
        return res.status(400).json("Catégorie non spécifiée. Veuillez sélectionner une catégorie.");
    }

    try {
        // Rechercher ou créer la catégorie
        let category = await Category.findOne({ where: { title: newProduct.Categorytitle } });
        if (!category) {
            category = await Category.create({ title: newProduct.Categorytitle });
        }

        // Créer le produit avec le CategoryId défini
        const product = {
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            CategoryId: category.id // Utiliser l'ID de la catégorie trouvée ou créée
        };

        await Product.create(product);
        res.status(200).json(`${product.name} a été ajouté à la liste des produits avec la catégorie ${category.title}`);
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error);
        res.status(500).json("Erreur lors de l'ajout du produit.");
    }
});

// Update product
app.put("/product",  async (req, res) => {
    try {
        const modifiedProduct = req.body;
        await Product.update(modifiedProduct, {
            where: { id: modifiedProduct.id }
        });

        const updatedProduct = await Product.findByPk(modifiedProduct.id);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(400).json({ message: "Erreur lors de la modification" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification du Produit." });
    }
});

// Delete product by id
app.delete("/product/:id",  async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            const productDestroyed = product.dataValues;
            await product.destroy();
            res.status(200).json({ message: "Produit supprimé", data: productDestroyed });
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur 500" });
    }
});

// Get all categories
app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories.length > 0) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ message: "Aucune catégorie" });
        }
    } catch (error) {
        res.status(500).json("Erreur lors de la recherche des Catégories.");
    }
});

// Create category
app.post("/category",  async (req, res) => {
    const newCategory = req.body;
    try {
        const existingCategory = await Category.findOne({ where: { name: newCategory.name } });
        if (!existingCategory) {
            await Category.create(newCategory);
            res.status(200).json(newCategory.name + " a été ajouté à la liste des catégories");
        } else {
            res.status(400).json("Nom de catégorie existant");
        }
    } catch (error) {
        res.status(500).json("Erreur lors de l'ajout de la catégorie.");
    }
});

// Update category
app.put("/category",  async (req, res) => {
    try {
        const modifiedCategory = req.body;
        await Category.update(modifiedCategory, {
            where: { id: modifiedCategory.id }
        });

        const updatedCategory = await Category.findByPk(modifiedCategory.id);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(400).json({ message: "Erreur lors de la modification" });
        }
    } catch (error) {
        res.status(500).json("Erreur 500");
    }
});

// Delete category by id
app.delete("/category/:id",  async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            const categoryDestroyed = category.dataValues;
            await category.destroy();
            res.status(200).json({ message: "Catégorie supprimée", data: categoryDestroyed });
        } else {
            res.status(404).json({ message: "Catégorie non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur 500" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})