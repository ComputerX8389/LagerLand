const mariadbRepo = require('../repositories/mariadb.js');

const itemRepo = mariadbRepo.itemRepo();
const categoryRepo = mariadbRepo.categoryRepo();

exports.get = async (req, res) => {
    try {
        const result = await itemRepo.getAll();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

exports.getID = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await itemRepo.getByID(id);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

exports.post = async (req, res) => {
    const categoryID = req.body.CategoryID;
    const name = req.body.Name;
    const description = req.body.Description;

    try {
        // Check if name is empty
        if (!name) {
            return res.status(400).json('Bad request');
        }

        if (!categoryRepo.exits(categoryID)) {
            return res.status(400).json('Category not found');
        }

        const result = await itemRepo.create(name, description, categoryID);
        return res.status(201).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

exports.put = async (req, res) => {
    const id = Number(req.params.id);
    const name = req.body.Name;
    const description = req.body.Description;
    const categoryID = req.body.CategoryID;

    try {
        // Check if id is empty
        if (!id) {
            return res.status(400).json('Bad request');
        }

        if (id !== req.body.ID) {
            return res.status(400).json('Bad request');
        }

        if (!itemRepo.exits(id)) {
            return res.status(404).json('Item not found');
        }

        if (!categoryRepo.exits(categoryID)) {
            return res.status(404).json('Category not found');
        }

        await itemRepo.update(id, 'Name', name);
        await itemRepo.update(id, 'Description', description);
        await itemRepo.update(id, 'Categories', categoryID);
        return res.status(204).json('');
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};
