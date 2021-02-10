module.exports = function(RED) {
	const express = require("express");
	const app = express();
	function AzureAdAuth(n) {
		var node = this;
		RED.nodes.createNode(this, n);
		// Retrieve the config node
		//azure-ad config
		this.url= n.url;
		var redirectUrl= n.redirectUrl;
		const configNode = RED.nodes.getNode(n.config);
		const pca = configNode.pca;
		var clientId = configNode.clientId;
		var clientSecret = configNode.clientSecret;

		// Create Express App and Routes
		const authCodeUrlParameters = {
			scopes: ["user.read"],
			redirectUri: redirectUrl
		};



		RED.httpNode.get(this.url, function(req, res){
			pca.getAuthCodeUrl(authCodeUrlParameters).then(function(response) {
				response.clientId = clientId;
				response.clientSecret = clientSecret;
				////node.send(res);
				//node.send(response);
				//// Create Express App and Routes
				////const acquireTokenParameters = {
				////	code: response.code,
				////	redirectUri: this.redirectUrl
				////};
				////pca.acquireTokenByCode(acquireTokenParameters).then(function(response) {
				////	node.send(response);
				////	res.redirect(response);
				////});
				res.redirect(response);
			});


			//pca.acquireToken
		});
	}

	RED.nodes.registerType("azure-ad-auth",AzureAdAuth);
}
