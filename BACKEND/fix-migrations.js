const knex = require('knex');
const config = require('./knexfile.js');

const db = knex(config.development);

db.schema.dropTableIfExists('knex_migrations')
  .then(() => {
    console.log('Tabla knex_migrations limpiada');
    return db.schema.dropTableIfExists('knex_migrations_lock');
  })
  .then(() => {
    console.log('Tabla knex_migrations_lock limpiada');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
