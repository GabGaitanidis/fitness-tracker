const { Pool } = require("pg");

// connection string pulled from environment variables for flexibility and security
// Example .env variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
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
