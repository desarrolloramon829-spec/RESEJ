const knex = require('knex');
const config = require('./knexfile.js');

const db = knex(config.development);

async function resetDatabase() {
  try {
    // Drop all types
    const types = await db.raw(`
      SELECT typname FROM pg_type 
      WHERE typnamespace = 'public'::regnamespace
      AND typtype = 'e'
    `);

    for (const type of types.rows) {
      console.log(`Dropping type: ${type.typname}`);
      await db.raw(`DROP TYPE IF EXISTS "${type.typname}" CASCADE`);
    }

    // Drop all tables
    const tables = await db.raw(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
    `);

    for (const table of tables.rows) {
      console.log(`Dropping table: ${table.tablename}`);
      await db.raw(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
    }

    console.log('Base de datos limpiada completamente');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

resetDatabase();
