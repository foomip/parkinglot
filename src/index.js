import app from './app'

const port = process.env.PARKINGLOT_LISTEN_PORT || app.get('port')
const server = app.listen(port, '0.0.0.0')

server.on('listening', () =>
  console.log(`Feathers application started on 0.0.0.0:${port}`) // eslint-disable-line no-console
)
