import dotenv from 'dotenv';
import zip from 'bestzip';
import * as Figma from 'figma-js';

import { saveFileFromUrlToFs } from './utils/saveFileToFs.mjs';

// .envの設定を読み込む
dotenv.config();

const currentFileId = process.env.FIGMA_FILE_ID;

const client = Figma.Client({ personalAccessToken: process.env.FIGMA_TOKEN || '' });

//指定したファイルの名前を取得する
const getFileName = async (fileId) => {
    const file = await client.file(fileId);
    return file.data.name;
}

//指定したファイルのコンポーネントを取得する
const getFileComponents = async (fileId) => {
    const file = await client.file(fileId);
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

// 画像をダウンロードして保存する
const saveFilesToFs = async (files, dest) => {
    for (const file of files) {
        const { url, fileName } = file;
        try {
            await saveFileFromUrlToFs(url, dest, fileName);
        } catch (error) {
            throw new Error('Error saving file ${fileName}');
        }
    }
}

// 指定したFigmaファイルからコンポーネントをダウンロードして保存する
export const exportAssets = async (fileId, dest) => {
    const svgFiles = await getFileComponentsImagesURL(fileId, 'svg');
    await saveFilesToFs(svgFiles, dest);
    const pngFiles = await getFileComponentsImagesURL(fileId, 'png');
    await saveFilesToFs(pngFiles, dest);
}

// ZIP!
export const zipAssets = async (fileId, dest) => {
    const thisFileName = await getFileName(currentFileId);
    console.log(thisFileName);
    await exportAssets(fileId, dest);
    await zip({
        source: `${dest}/*`,
        destination: `./${thisFileName}_${dest}.zip`
    }).then(function () {
        console.log('all done!');
    }).catch(function (err) {
        console.error(err.stack);
        process.exit(1);
    });

}


zipAssets(currentFileId, 'assets');
