/**
 * Created by pamas on 12/02/2017.
 */
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, '../client/dist')
			}
		}
	}
});
server.connection({ port: process.env.PORT || 8080 });

server.register(Inert, () => {});

server.route({
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: '.'
		}
	}
});

server.start((err) => {

	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});