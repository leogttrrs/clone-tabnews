import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  // oi

  const dbVersionQr = await database.query("SHOW server_version;")
  const dbVersion = dbVersionQr.rows[0].server_version

  const maxConnectionsQr = await database.query("SHOW max_connections;")
  const maxConnections = maxConnectionsQr.rows[0].max_connections

  const databaseName = process.env.POSTGRES_DB
  const activeConnectionsQr = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName]
  })
  const activeConnections = activeConnectionsQr.rows[0].count

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: parseFloat(dbVersion),
        max_connections: parseInt(maxConnections),
        active_connections: parseInt(activeConnections)
      }
    },
  })
}

export default status