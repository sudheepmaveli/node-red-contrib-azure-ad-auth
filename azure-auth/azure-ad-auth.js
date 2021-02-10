module.exports = function(RED) {
	const express = require("express");
	const app = express();
	function AzureAdAuth(n) {
		var node = this;
		RED.nodes.createNode(this, n);
		// Retrieve the config node
		//azure-ad config
		this.url= n.url;
		node.redirectUrl= n.redirectUrl;
		const configNode = RED.nodes.getNode(n.config);
		const pca = configNode.pca;
		node.clientId = configNode.clientId;
		node.clientSecret = configNode.clientSecret;

		var myDict = {
		    "clientId": configNode.clientId,
		    "clientSecret": configNode.clientSecret,
		    "redirectUrl": n.redirectUrl
		};
		// Create Express App and Routes
		const authCodeUrlParameters = {
			scopes: ["user.read"],
			redirectUri: node.redirectUrl,
			extraQueryParameters :myDict
		};



		RED.httpNode.get(this.url, function(req, res){
			
			pca.getAuthCodeUrl(authCodeUrlParameters).then(function(response) {	
				req.query["clientId"] = node.clientId;
				req.query["redirectUrl"] = node.redirectUrl;
				req.query["clientSecret"] = node.clientSecret;
				res.redirect(response);
			});
			//pca.acquireToken
		});
	}

	RED.nodes.registerType("azure-ad-auth",AzureAdAuth);
}
