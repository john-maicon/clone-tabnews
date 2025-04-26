
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: "uuid", 
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    username: {
      type: 'VARCHAR(30)', // for reference, GitHub has a 39 character limit
      notNull: true,
      unique: true,
    },
    // why 254 in length? https://stackoverflow.com/a/1199238
    email:{
      type: 'VARCHAR(254)', 
      notNull: true,
      unique: true,
    },
    // why 60 in length? https://www.npmjs.com/package/bcrypt#hash-info
    password: {
      type: 'VARCHAR(60)', // bcrypt hash length
      notNull: true,
    },
    // why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: 'timestamptz',
      default: pgm.func("timezone('UTC', now())"), // garantindo que valor sera em UTC timezone
      notNull: true,
    },
    updated_at: {
      type: 'timestamptz',
      default: pgm.func("timezone('UTC', now())"), // garantindo que valor sera em UTC timezone
      notNull: true,
    },
  });
};


exports.down = false;