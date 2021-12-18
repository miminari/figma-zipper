import * as Figma from 'figma-js';

const client = Figma.Client( { personalAccessToken: process.env.FIGMA_TOKEN || '' });

console.log( client );
