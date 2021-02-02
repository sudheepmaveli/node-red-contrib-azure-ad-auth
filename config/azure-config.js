module.exports = function(RED) {
	function AzureConfig(n) {
		RED.nodes.createNode(this,n);
		this.clientId = n.clientId;
		this.clientSecret = n.clientSecret;
		this.authority = n.authority;

		const express = require("express");
		const msal = require('@azure/msal-node');

		const SERVER_PORT = process.env.PORT || 3000;

// Before running the sample, you will need to replace the values in the config,
// including the clientSecret
		const config = {
			auth: {
				clientId: this.clientId,
				authority: this.authority,
				clientSecret: this.clientSecret
			}
		}

		const pca = new msal.ConfidentialClientApplication(config);
		pca.knownAuthorities = config.auth.authority;

		this.pca = pca;

	};
	RED.nodes.registerType("azure-config",AzureConfig);
}