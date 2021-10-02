const express = require('express')
const path = require('path')
const { HOST } = require('./src/constants')
const fs = require('fs');
const { backgrounds, grounds, groundExtras, trunks, tops, fruits, flowers, animals } = require('./src/traits')
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const { generateImage } = require('./src/generateImages');

const PORT = process.env.PORT || 7000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', function(req, res) {
  res.send("The OxyForests NFT metadata service is running!");
})

// api serving contract-level metadata
app.get('/contract/nft', function(req, res) {
  const data = {
    'name': 'OxyForests',
    'description': 'OxyForests description.',
    'image': `${HOST}/images/oxy-forests-profile.png`,
    'external_link': 'https://nfseeds.earth'
  }
  res.send(data)
})

const outputDirectory = "./public/images/";
const outputDirectoryResponse = "images/";

app.get('/token/:dna', function(req, res) {
  const dna = req.params.dna;

  const traitsList = dna.split(".");

  if (traitsList.length !== 8) { // if different than 6 traits

    const data = {
      'status': "error",
      'message': "dna shall consist of 6 traits"
    }
    res.send(data);
  } else {

    try {

      const outputImagePath = outputDirectory+dna+".png";

      // Check if image exists and creates it
      fs.access(outputImagePath, fs.constants.F_OK, (err) => {
        const background = parseInt(traitsList[0]);
        const ground = parseInt(traitsList[1]);
        const groundExtra = parseInt(traitsList[2]);
        const trunk = parseInt(traitsList[3]);
        const top = parseInt(traitsList[4]);
        const fruit = parseInt(traitsList[5]);
        const flower = parseInt(traitsList[6]);
        const animal = parseInt(traitsList[7]);

        if (err) {

          if (backgrounds.has(background) &&
              grounds.has(ground) &&
              groundExtras.has(groundExtra) &&
              trunks.has(trunk) &&
              tops.has(top) &&
              fruits.has(fruit) &&
              flowers.has(flower) &&
              animals.has(animal)) {

            generateImage(traitsList, dna);

            const data = {
              'attributes': [
                {"trait_type": 'Background', "value": backgrounds.get(background)},
                {"trait_type": 'Ground', "value": grounds.get(ground)},
                {"trait_type": 'Ground Extra', "value": groundExtras.get(groundExtra)},
                {"trait_type": 'Trunk', "value": trunks.get(trunk)},
                {"trait_type": 'Top', "value": tops.get(top)},
                {"trait_type": 'Fruits', "value": fruits.get(fruit)},
                {"trait_type": 'Flowers', "value": flowers.get(flower)},
                {"trait_type": 'Animal', "value": animals.get(animal)}
              ],
              'name': `NFTree #X`,
              'image': `${HOST}${outputDirectoryResponse}${dna}.png`
            }
            res.send(data);

          } else {
            const data = {
              'traits': [
                {"trait_type": 'Background', "value": backgrounds.get(background)},
                {"trait_type": 'Ground', "value": grounds.get(ground)},
                {"trait_type": 'Ground Extra', "value": groundExtras.get(groundExtra)},
                {"trait_type": 'Trunk', "value": trunks.get(trunk)},
                {"trait_type": 'Top', "value": tops.get(top)},
                {"trait_type": 'Fruits', "value": fruits.get(fruit)},
                {"trait_type": 'Flowers', "value": flowers.get(flower)},
                {"trait_type": 'Animal', "value": animals.get(animal)}
              ],
              'status': "error",
              'message': "DNA with non-existent traits, please check"
            }
            res.send(data)
          }

        } else {
          const data = {
            'attributes': [
              {"trait_type": 'Background', "value": backgrounds.get(background)},
              {"trait_type": 'Ground', "value": grounds.get(ground)},
              {"trait_type": 'Ground Extra', "value": groundExtras.get(groundExtra)},
              {"trait_type": 'Trunk', "value": trunks.get(trunk)},
              {"trait_type": 'Top', "value": tops.get(top)},
              {"trait_type": 'Fruits', "value": fruits.get(fruit)},
              {"trait_type": 'Flowers', "value": flowers.get(flower)},
              {"trait_type": 'Animal', "value": animals.get(animal)}
            ],
            'name': `NFTree #$X`,
            'image': `${HOST}${outputDirectoryResponse}${dna}.png`
          }
          res.send(data)
        }
      });

    } catch (error) {
      const data = {
        'status': "error",
        'message': "dna is inconsistent"
      }
      res.send(data);
    }
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
