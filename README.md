#  Stackup AELF & GCP Smart Contract Generator & Deployer Backend

This is a Smart Contract Generator & Deployer application. It uses Express.js for the web server, Google Cloud Storage for storing smart contract templates, and Aelf SDK for deploying smart contracts.

## Prerequisites

- Node.js
- Google Cloud SDK
- Aelf SDK
- Google Cloud Storage bucket set up

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Charlo-tech/contract-generator.git
    cd contract-generator
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure Google Cloud Storage:**

    Make sure you have a Google Cloud project and a storage bucket. Update the `BUCKET_NAME` in the `index.js` file with your bucket name.

4. **Deploy to Google Cloud Functions:**

    ```bash
    gcloud functions deploy generateSmartContract --runtime --trigger-http --allow-unauthenticated
    ```

    Replace `generateSmartContract` with the name of your function.

## Usage

The backend provides two main endpoints:

### `POST /generate`

Generates a smart contract from a template stored in Google Cloud Storage.

#### Request Body

```json
{
    "templateName": "string",
    "parameters": {
        "key1": "value1",
        "key2": "value2"
    }
}

#### Response

```json
{
    "success": true,
    "contract": "string"
}
```

### `POST /deploy`

Deploys a smart contract to the Aelf blockchain.

#### Request Body

```json
{
    "contractCode": "string",
    "accountAddress": "string",
    "accountPrivateKey": "string"
}
```


### Frontend (`App.js`) README

```markdown
# Smart Contract Generator & Deployer Frontend

This is the frontend for a Smart Contract Generator & Deployer application built with React. It allows users to input parameters, generate a smart contract from a template, and deploy the contract to the Aelf blockchain.



## Prerequisites

- Node.js
- npm or yarn
- Aelf SDK
- Google Cloud Storage (for template storage)
- axios

## Host frontend on Google firebase

1. **Install Firebase CLI:**

    ```bash
    npm install -g firebase-tools
    ```
2. **Login to Firebase:**

    ```bash
    firebase login
    ```
3. **Initialize Firebase project:**

    ```bash
    firebase init
    ```
4. **Deploy to Firebase:**

    ```bash
    firebase deploy
    ```
5. **Open the deployed app:**

    ```bash
    firebase open hosting:site
    ```
    

## Setup


1. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

2. **Start the development server:**

    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

1. **Template Name:** Enter the name of the smart contract template stored in Google Cloud Storage.

2. **Parameters:** Enter the parameters for the smart contract in JSON format.

3. **Generate Contract:** Click the "Generate Contract" button to generate the contract from the template and parameters.

4. **Account Address:** Enter the account address to deploy the smart contract.

5. **Account Private Key:** Enter the private key of the account for deploying the smart contract.

6. **Deploy Contract:** Click the "Deploy Contract" button to deploy the generated contract to the Aelf blockchain.

## Styling

The application is styled using inline CSS to provide a modern look with a gradient black background, shadows, and a "crypto" theme.

## License

This project is licensed under the MIT License.
