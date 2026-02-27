import dotenv from "dotenv";

dotenv.config();
console.log("🔹 DB_HOST:", process.env.DB_HOST);
console.log("🔹 DB_NAME:", process.env.DB_NAME);
export default {
  uri: process.env.DB_HOST || "mongodb://127.0.0.1:27017/qahween",
  db_name: process.env.DB_NAME || "",
};
