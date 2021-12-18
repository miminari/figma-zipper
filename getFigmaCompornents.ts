import * as got from 'got';

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_ID;

export const getFigmaComponents = async () => {
    const body = await got.get(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/components`,{
        headers: {
            'X-FIGMA_TOKEN': process.env.FIGMA_TOKEN,
        },
    })
    const results = body;
    console.log(results);
    return results;
}