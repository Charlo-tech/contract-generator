// Import Google Cloud Storage client library
const { Storage } = require('@google-cloud/storage');

// Import Express framework
const express = require('express');

// Import Aelf SDK for interacting with Aelf blockchain
const Aelf = require('aelf-sdk');

// Initialize an Express application
const app = express();

// Initialize Google Cloud Storage client
const storage = new Storage();

// Initialize Aelf SDK client with the provided HTTP provider(testnet url)
const aelf = new Aelf(new Aelf.providers.HttpProvider('https://tdvw-test-node.aelf.io/'));

// Define the name of the Google Cloud Storage bucket
const BUCKET_NAME = 'ruita-cr';

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to generate a smart contract from a template
app.post('/generate', async (req, res) => {
    // Extract template name and parameters from the request body
    const { templateName, parameters } = req.body;

    try {
        // Retrieve the template file from Google Cloud Storage
        const file = storage.bucket(BUCKET_NAME).file(`${templateName}.sol`);
        const [template] = await file.download();

        // Convert the template to a string
        let contract = template.toString();

        // Replace placeholders in the template with provided parameters
        for (const [key, value] of Object.entries(parameters)) {
            contract = contract.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }

        // Send the generated contract back in the response
        res.status(200).send({ contract });
    } catch (error) {
        // Log and send an error response if template generation fails
        console.error('Error generating smart contract:', error);
        res.status(500).send('Error generating smart contract');
    }
});

// POST endpoint to deploy a smart contract to the Aelf blockchain
app.post('/deploy', async (req, res) => {
    // Extract contract code, account address, and account private key from the request body
    const { contractCode, accountAddress, accountPrivateKey } = req.body;

    try {
        // Get the account object from the provided private key
        const account = aelf.wallet.getWalletByPrivateKey(accountPrivateKey);

        // Deploy the contract code to the Aelf blockchain
        const result = await aelf.chain.contractDeploy(contractCode, accountAddress, account);

        // Send the deployment result back in the response
        res.status(200).send({ result });
    } catch (error) {
        // Log and send an error response if contract deployment fails
        console.error('Error deploying contract:', error);
        res.status(500).send('Error deploying smart contract');
    }
});

// Function to handle incoming requests (for Google Cloud Functions)
const gcloudHandler = app;

// Export the function name for Google Cloud Functions
exports.smartContractHandler = gcloudHandler;
