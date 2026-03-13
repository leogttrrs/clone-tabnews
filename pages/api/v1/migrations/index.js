import migrationRunner from 'node-pg-migrate'
import { join } from "node:path"

export default async function migrations(request, response) {
  if (request.method === "GET") {
    console.log("É get!")

    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations"
    })
    return response.status(200).json(migrations)
  }


  if (request.method === "POST") {
    console.log("É post!")
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations"
    })
    return response.status(200).json(migrations)
  }

  return response.status(405).end();

}