exports.index = (_req, res) => {
    knex("entry")
        .join("warehouses", "inventories.warehouse_id", "warehouses.id")
        .select(
            "inventories.id",
            "inventories.warehouse_id",
            "warehouses.warehouse_name",
            "inventories.item_name",
            "inventories.description",
            "inventories.category",
            "inventories.status",
            "inventories.quantity"
        )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving inventories: ${err}`)
        );
};