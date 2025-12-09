import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  const databaseVersionResult = await database.query("SHOW server_version")
  const version = databaseVersionResult.rows[0].server_version
  response.status(200).json({
    updated_at: updatedAt,
    version: version
  })
}

export default status