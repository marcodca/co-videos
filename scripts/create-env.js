//This script is used to creating a .env file on build time, and thus keeping the environment variables safe.

const fs = require("fs");
fs.writeFileSync("./.env", `TMDB_API_KEY=${process.env.TMDB_API_KEY}\n`);
