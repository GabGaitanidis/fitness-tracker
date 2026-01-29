const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://gabz:123@localhost:5432/fitness",
});
