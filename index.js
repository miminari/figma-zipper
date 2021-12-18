"use strict";
exports.__esModule = true;
var Figma = require("figma-js");
var client = Figma.Client({ personalAccessToken: process.env.FIGMA_TOKEN || '' });
// const currentFileId:string = `${process.env.FIGMA_FILE_ID}`;
// console.log(process.env.FIGMA_FILE_ID);
// console.log(currentFileId);
console.log(client);
client.file('htmnROP94VCQHmybXdrIYd').then(function (_a) {
    var data = _a.data;
    console.log(data);
});
// export const getPages = async (fileId: string, pageNames: string[] ) => {
//     if (!fileId ) {
//         fileId = 'htmnROP94VCQHmybXdrIYd';
//     }
//     const file = await client.file(fileId);
//     const pages = file.data.document.children;
//     if( pageNames.length === 0) {
//         return pages;
//     }
// }
// getPages('',[]);
