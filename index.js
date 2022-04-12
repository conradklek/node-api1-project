const server = require('./api/server');

const port = 9000;

server.listen(port, () => console.log(`🌎 API Server now listening on port ${port}\n`));
