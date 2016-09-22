const debug = require("debug")("apn");

const credentials = require("./lib/credentials")({
	debug
});

const config = require("./lib/config")({
	debug,
	prepareCertificate: credentials.certificate,
});

const tls = require("tls");

const framer     = require("http2/lib/protocol/framer");
const compressor = require("http2/lib/protocol/compressor");

const protocol = {
	Serializer:   framer.Serializer,
	Deserializer: framer.Deserializer,
	Compressor:   compressor.Compressor,
	Decompressor: compressor.Decompressor,
	Connection:   require("http2/lib/protocol/connection").Connection,
};

const Endpoint = require("./lib/protocol/endpoint")({
	tls,
	protocol,
});

const EndpointManager = require("./lib/protocol/endpointManager")({
	Endpoint,
});

const Client = require("./lib/client")({
  config,
  EndpointManager,
});

const Provider = require("./lib/provider")({
  Client,
});

const Notification = require("./lib/notification");

const token = require("./lib/token");

module.exports = {
	Provider,
	Notification,
  token,
};
