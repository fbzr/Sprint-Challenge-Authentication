const db = require('../dbConfig');

const find = () => db('users');

const findById = id => db('users').where({id}).first();

const findBy = filter => db('users').where(filter);

const add = async user => {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
}

module.exports = {
    find,
    findById,
    findBy,
    add
}