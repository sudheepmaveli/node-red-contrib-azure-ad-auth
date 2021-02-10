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
				var responseData={};
				responseData.clientId = clientId;
				responseData.clientSecret = clientSecret;
				responseData.redirectUrl = redirectUrl;
				responseData.response=response;				
				res.redirect(responseData);
			});


			//pca.acquireToken
		});
	}

	RED.nodes.registerType("azure-ad-auth",AzureAdAuth);
}
