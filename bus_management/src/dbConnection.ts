import postgres, { Options } from "postgres";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const options: Options<{}> = {
	connect_timeout: 5000,
	idle_timeout: 10000,
	max: 10,
	ssl: false,
	onnotice: (notice) => {
		console.log("Received PostgreSQL notice:", notice);
	},
};

let sql: postgres.Sql<{}>;

if (process.env.DATABASE_URL == undefined) {
	console.log("Error getting the .env");
} else {
	sql = postgres(process.env.DATABASE_URL, options);
}

// Export a function to explicitly close the database connection
export async function closeConnection() {
	if (sql) {
		await sql.end();
		console.log("Database connection closed.");
	}
}

export { sql };
