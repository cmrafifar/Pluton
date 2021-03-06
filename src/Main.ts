// This module spins up the HTTP server and other game components.

import { get } from 'lodash'
import { stampLog } from './Log'
import { createServer } from './Server'
import { Ticker } from './Ticker'

const log = stampLog(`Main`)
const $ = log()

const main =
  async () => {
    const prefix = get(process.env, 'BASE_URL', '')
    const port = get(process.env, 'PORT', 3000)
    const server = await createServer(prefix)

    await server.listen(port)
    $(`HTTP server listening at http://localhost:${port}${prefix ? `/${prefix}` : ''}`)

    const ticker = new Ticker
    $(`Starting ticker...`)
    ticker.start()
  }

process.on('unhandledRejection', err => {
  const $ = log()
  $(`Unhandled Rejection: %O.`, err)
  process.exit(1)
})

main()
