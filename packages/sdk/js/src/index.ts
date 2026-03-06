export * from "./client.js"
export * from "./server.js"

import { createNexodeClient } from "./client.js"
import { createNexodeServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createNexode(options?: ServerOptions) {
  const server = await createNexodeServer({
    ...options,
  })

  const client = createNexodeClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
