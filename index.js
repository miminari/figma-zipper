"use strict";
exports.__esModule = true;
var Figma = require("figma-js");
var client = Figma.Client({ personalAccessToken: process.env.FIGMA_TOKEN || '' });
console.log(client);
