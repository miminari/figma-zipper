import * as fs from 'fs';
import fetch from 'node-fetch';

export const saveFileFromUrlToFs = async (url, dest, fileName) => {
    try {
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        const fileStream = fs.createWriteStream(`${dest}/${fileName}`);
        response?.body?.pipe(fileStream);
    } catch (error) {
        throw error;
    }
}