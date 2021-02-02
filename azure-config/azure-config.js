module.exports = function(RED) {
	function AzureConfig(n) {
		RED.nodes.createNode(this,n);
		this.clientId = n.clientId;
		this.clientSecret = n.clientSecret;
		this.authority = n.authority;
	}
	RED.nodes.registerType("azure-config",AzureConfig);
}