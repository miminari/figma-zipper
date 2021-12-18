import dotenv from 'dotenv';
import * as Figma from 'figma-js';

import { saveFileFromUrlToFs } from './utils/saveFileToFs.mjs';

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
const getFileComponentsImagesURL = async (fileId, format) => {
    const fileComponents = await getFileComponents(fileId);
    const renderFiles = [];
    for (const nodeId in fileComponents) {
        try {
            const response = await client.fileImages(fileId, {
                ids: [nodeId],
                format: format,
            })
            const url = response.data.images[nodeId];
            const fileName = `${fileComponents[nodeId].name}.${format}`;
            renderFiles.push({ url: url, fileName: fileName });
        } catch (error) {
            console.error(`Error! ${error}`);
            process.exit(1);
        }
    }
    console.log(renderFiles);
    return renderFiles;
}

getFileComponentsImagesURL(currentFileId, 'svg');