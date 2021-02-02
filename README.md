# node-red-contrib-azure-ad-auth

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]

Custom Nodes for [Node RED](https://nodered.org) to allow authentication via [node-red-contrib-azure-ad-auth].

The add-on is still in early development and the functionality will be enhanced
over time.

## Installation

Right now there are to available options to install Node RED add-ons.

### Via the Web-Interface

1. Open the menu in the upper right corner
2. Choose **Manage Palette**
3. Under **Install**, search for: *node-red-contrib-azure-ad-auth*

### Via the command line

1. Navigate to your Node RED user directory, usally `$HOME/.node-red`
2. Run the following command:

```shell
npm install node-red-contrib-azure-ad-auth
```

---

## Usage

Right now the is just a single Node implemented.

## Config Node

Before using any nodes you have to configure the Active Directory. For that you have
the option to create config nodes from within the normal nodes.

You only need 3 parameters from your Azore portal:

1. Your Authority, usally something like this:

   `https://login.microsoftonline.com/[your_tenant_guid]`
2. The client id, which is found under the **Overview** Tab in the Azure console
   for your app registration.
3. The client Secret, , which is found under the **Certificates & secrets** Tab in the Azure console
   for your app registration

---
