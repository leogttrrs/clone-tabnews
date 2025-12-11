test("GET TO /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)

  const responseBody = await response.json()

  expect(responseBody.updated_at).toBeDefined()
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

  expect(responseBody.dependencies.database.version).toBeDefined()
  const version = responseBody.dependencies.database.version
  expect(typeof version).toBe("number");
  expect(version).toBeGreaterThan(0);
  expect(version).toBe(16.0)

  expect(responseBody.dependencies.database.max_connections).toBeDefined()
  expect(typeof responseBody.dependencies.database.max_connections).toBe("number")
  const maxConnections = responseBody.dependencies.database.max_connections
  expect(isNaN(maxConnections)).toBe(false)
  expect(maxConnections).toBe(100)

  expect(responseBody.dependencies.database.active_connections).toBeDefined()
  const activeConnections = parseInt(responseBody.dependencies.database.active_connections)
  expect(activeConnections).toBe(1)

});