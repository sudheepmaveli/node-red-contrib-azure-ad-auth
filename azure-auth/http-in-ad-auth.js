/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
	
	const express = require("express");
	const msal = require('@azure/msal-node');

	const SERVER_PORT = process.env.PORT || 3000;
	
function HTTPInAzureAdAuth(config) {
    RED.nodes.createNode(this,config);
    // node-specific code goes here
	if (RED.settings.httpNodeRoot !== false) {
		
		if (!n.url) {
			this.warn(RED._("httpin.errors.missing-path"));
			return;
		}
		if (!n.redirectUrl) {
			this.warn(RED._("httpin.errors.missing-path"));
			return;
		}
		this.url = n.url;
		if (this.url[0] !== '/') {
			this.url = '/' + this.url;
		}
		this.redirectUrl = n.redirectUrl;
		if (this.redirectUrl[0] !== '/') {
			this.redirectUrl = '/' + this.redirectUrl;
		}
		
		this.clientId = n.clientId;
        this.clientSecret = n.clientSecret;
		this.authority = n.authority;	
		
		const config = {
			auth: {
				clientId: this.clientId,
				authority: this.authority,
				clientSecret: this.clientSecret
			},
		    system: {
		        loggerOptions: {
		            loggerCallback(loglevel, message, containsPii) {
		                console.log(message);
		            },
		            piiLoggingEnabled: false,
		            logLevel: msal.LogLevel.Verbose,
		        }
		    }
		};		
		
		// Create msal application object
		const pca = new msal.ConfidentialClientApplication(config);

		// Create Express App and Routes
		const app = express();
	app.get('/', (req, res) => {
	console.log(JSON.stringify(res));
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: this.redirectUrl
    };

    // get url to sign user in and consent to scopes needed for application
    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
		console.log(JSON.stringify(response));
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

	app.get('/redirect', (req, res) => {
		const tokenRequest = {
			code: req.query.code,
			scopes: ["user.read"],
			redirectUri: this.redirectUrl
		};

		pca.acquireTokenByCode(tokenRequest).then((response) => {
			console.log("\nResponse: \n:", response);
			res.sendStatus(200);
		}).catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
	});


	app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))

			
		this.on("close", function () {
                var node = this;
                RED.httpNode._router.stack.forEach(function (route, i, routes) {
                    if (route.route && route.route.path === node.url && route.route.methods[node.method]) {
                        routes.splice(i, 1);
                    }
                });
        });
	} else {
            this.warn(RED._("httpin.errors.not-created"));
    }

}

RED.nodes.registerType("http-in-azure-ad-auth",HTTPInAzureAdAuth);
}
