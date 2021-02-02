module.exports = function(RED) {
	function AzureAdAuth(config) {
		RED.nodes.createNode(this,config);

		// Retrieve the config node
		this.server = RED.nodes.getNode(config.server);

		if (this.server) {
			// Do something with:
			//  this.server.host
			//  this.server.port
		} else {
			// No config node configured
		}
	}
	RED.nodes.registerType("azure-ad-auth",AzureAdAuth);
}