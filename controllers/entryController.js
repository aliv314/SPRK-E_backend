// exports.index = (_req, res) => {
//     knex("entry")
//         .join("user", "id", "user.id")
//         .select(
//             "user.id",
//             "entry.id",
//         )
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch((err) =>
//             res.status(400).send(`Error retrieving inventories: ${err}`)
//         );
// };