const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER || "gabz"}:${
    process.env.DB_PASSWORD || "123"
  }@${process.env.DB_HOST || "localhost"}:${
    process.env.DB_PORT || "5432"
  }/${process.env.DB_NAME || "fitness"}`;

module.exports = new Pool({
  connectionString,
});
