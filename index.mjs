import dotenv from 'dotenv';
import * as Figma from 'figma-js';

// .envの設定を読み込む
dotenv.config();

const currentFileId = process.env.FIGMA_FILE_ID;

const client = Figma.Client({ personalAccessToken: process.env.FIGMA_TOKEN || '' });

//指定したファイルのコンポーネントを取得する
const getFileComponents = async (fileId) => {
    const file = await client.file(fileId);
    console.log(file.data.name);
    const fileComponents = file.data.components;
    return fileComponents;
}

// 指定したファイルのコンポーネントの画像を取得する
const getFileComponentsImages = async (fileId,format) => {
    const fileComponents = await getFileComponents(fileId);
    for ( const nodeId in fileComponents) {
        try {
            const response = await client.fileImages(fileId, {
                ids: [nodeId],
                format: format,
            })
            const url = response.data.images[nodeId];
            console.log(url);
        } catch (error) {
            console.error(`Error! ${error}`);
            process.exit(1);
        }
    }
}

getFileComponentsImages(currentFileId,'svg');