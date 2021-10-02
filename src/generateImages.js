const mergeImages = require('merge-images-v2');
const Canvas = require('canvas');
const fs = require('fs');

const backgroundsDirectory = "./src/traits/backgrounds/";
const groundsDirectory = "./src/traits/grounds/";
const groundExtrasDirectory = "./src/traits/ground-extras/";
const trunksDirectory = "./src/traits/trunks/";
const topsDirectory = "./src/traits/tops/";
const fruitsDirectory = "./src/traits/fruits/";
const flowersDirectory = "./src/traits/flowers/";
const animalsDirectory = "./src/traits/animals/";

const generateImage = (arrayList, i) => {
    const outPath = './public/images/';
    const outFile = `${i}.png`;

    fs.access(outPath, fs.constants.F_OK, (err) => {
        mergeImages([
            //`${backgroundsDirectory}${arrayList[0]}.jpg`,
            `${groundsDirectory}${arrayList[1]}.png`,
            `${groundExtrasDirectory}${arrayList[2]}.png`,
            `${trunksDirectory}${arrayList[3]}.png`,
            `${topsDirectory}${arrayList[4]}.png`,
            `${fruitsDirectory}${arrayList[5]}.png`,
            `${flowersDirectory}${arrayList[6]}.png`,
            `${animalsDirectory}${arrayList[7]}.png`,
        ], {
            Canvas
        }).then((b64) => {

            fs.access(outPath, fs.constants.F_OK, (err) => {
                fs.writeFile(outPath + outFile, b64.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {

                });
            });
        });
    });
}

module.exports = {
    generateImage
};
