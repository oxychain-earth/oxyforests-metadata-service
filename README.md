# OxyForests Metadata API <!-- omit in toc -->

The source code in this repo held the APIs that serve metadata for the tokens of the OxyForests to marketplaces like [OpenSea](https://opensea.io) and other third parties. 
This small solution is based on the ([ERC-721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) standard. The metadata for each token only includes a title, a description and an image.
This solution also generates images based on traits.

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Requirements
You need node.js (8.11.* or later) and npm installed to run it locally

1. Import the repository and `cd` into the new directory.
2. Run `npm install`.
3. Run `node index.js`.
4. Visit the token's metadata at http://localhost:5000/token/1 (for token 1) -- coming soon.
5. Visit the contract-level metadata at http://localhost:5000/contract/nft.
6. Get the information of the traits and the image at https://localhost:5000/token/traits/010101010101 (for dna 010101010101).

## Troubleshooting

If you have any questions, send them along with a hi to hello@oxychain.earth.
