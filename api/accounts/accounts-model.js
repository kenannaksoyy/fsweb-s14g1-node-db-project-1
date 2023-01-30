const db = require("../../data/db-config");
const getAll = () => {
  return db("accounts");
}

const getById = id => {
  return db("accounts").where({ id }).first();
}

const create = account => {
  return db("accounts")
  .insert(account)
  .then(idx => {
    return getById(idx[0]);
  });
}

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts")
    .where({ id })
    .update(account)
    .then(rows => {
      return getById(id);
    });
}

const deleteById = id => {
  // KODLAR BURAYA
  return db("accounts")
    .where('id', id)
    .del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
