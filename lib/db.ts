// lib/db.ts
import mysql from "mysql2/promise";

const dbPassword = process.env.DB_PASSWORD;

if (!dbPassword) {
  throw new Error(
    "Database password is not defined in the environment variables."
  );
}

const dbName = process.env.DB_NAME;

if (!dbName) {
  throw new Error("Database name is not defined in the environment variables.");
}

const dbUsername = process.env.DB_USERNAME;

if (!dbUsername) {
  throw new Error(
    "Database username is not defined in the environment variables."
  );
}

const pool = mysql.createPool({
  host: "localhost", // Replace with your database host
  user: dbUsername, // Replace with your database user
  password: dbPassword, // Replace with your database password
  database: dbName, // Replace with your database name
});

export async function fetchClasses() {
  const [rows] = await pool.query(`
    SELECT c.class_name, c.school_name, c.class_location, c.day_of_week, 
           c.start_time, c.end_time, c.instructor, cc.category_name, cl.level_description
    FROM circus_classes c
    JOIN class_level cl ON c.level_id = cl.id
    JOIN class_category cc ON c.category_id = cc.id;
  `);
  return rows;
}
