module.exports = function(RED) {
	const express = require("express");
	const app = express();
	function AzureAdAuth(n) {
		var node = this;
		RED.nodes.createNode(this, n);
		// Retrieve the config node
		//azure-ad config
		this.url= n.url;
		this.redirectUrl= n.redirectUrl;
		const configNode = RED.nodes.getNode(n.config);
		const pca = configNode.pca;

		// Create Express App and Routes
		const authCodeUrlParameters = {
			scopes: ["user.read"],
			redirectUri: this.redirectUrl,
		};

		RED.httpNode.get(this.url, function(req, res){
			pca.getAuthCodeUrl(authCodeUrlParameters).then(function(response) {
				node.send(response);
				res.redirect(response);
			});
		});
	}

	RED.nodes.registerType("azure-ad-auth",AzureAdAuth);
}
