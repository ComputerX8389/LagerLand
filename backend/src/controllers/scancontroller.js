const mariadbRepo = require('../repositories/mariadb.js');

const scanRepo = mariadbRepo.scanRepo();
const userRepo = mariadbRepo.userRepo();
const itemRepo = mariadbRepo.itemRepo();

exports.get = async (req, res) => {
    try {
        const result = await scanRepo.getAll(20);

        result.forEach((element) => {
            element.CheckStatus = Boolean(element.CheckStatus);
        });
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

exports.post = async (req, res) => {
    const itemID = req.body.ItemID;

    try {
        const token = req.headers['x-access-token'];

        const user = await userRepo.getByToken(token);
        let item = await itemRepo.getByID(itemID);

        if (!item) {
            return res.status(400).json('Item not found');
        }
        if (!user) {
            return res.status(401).json('User not found');
        }
        const userID = user.ID;
        const DateTime = new Date();

        const scanin = await scanRepo.create(userID, itemID, DateTime);
        const itemup = await itemRepo.update(itemID, 'CheckStatus', !item.CheckStatus);
        // Convert checkstatus to boolean and update item
        item.CheckStatus = !item.CheckStatus;
        return res.status(201).json({ Scan: scanin, ItemUpdate: itemup, Item: item });
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
};
