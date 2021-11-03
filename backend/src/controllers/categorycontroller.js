const mariadbRepo = require('../repositories/mariadb.js');

const categoryRepo = mariadbRepo.categoryRepo();

exports.get = async (req, res) => {
    try {
        const result = await categoryRepo.getAll();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

exports.post = async (req, res) => {
    const name = req.body.Name;
    const description = req.body.Description;

    try {
        // Check if name is empty
        if (!name) {
            return res.status(400).json('Bad request');
        }
        const result = await categoryRepo.create(name, description);
        return res.status(201).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};
