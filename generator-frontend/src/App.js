// Import React and useState hook from React library
import React, { useState } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

// Define the main App component
const App = () => {
    // State variables for storing input values and results
    const [templateName, setTemplateName] = useState(''); // Stores the template name
    const [parameters, setParameters] = useState({}); // Stores the parameters as an object
    const [contract, setContract] = useState(''); // Stores the generated contract code
    const [accountAddress, setAccountAddress] = useState(''); // Stores the account address
    const [accountPrivateKey, setAccountPrivateKey] = useState(''); // Stores the account private key
    const [deploymentResult, setDeploymentResult] = useState(''); // Stores the deployment result

    // Function to handle the generation of the smart contract
    const handleGenerate = async () => {
        try {
            // Make a POST request to the generate endpoint of the cloud function
            const response = await axios.post('http://your-cloud-function-url/generate', {
                templateName, // Send the template name
                parameters, // Send the parameters
            });
            // Update the state with the generated contract code
            setContract(response.data.contract);
        } catch (error) {
            // Log an error message if the request fails
            console.error('Error generating contract:', error);
        }
    };

    // Function to handle the deployment of the smart contract
    const handleDeploy = async () => {
        try {
            // Make a POST request to the deploy endpoint of the cloud function
            const response = await axios.post('http://your-cloud-function-url/deploy', {
                contractCode: contract, // Send the contract code
                accountAddress, // Send the account address
                accountPrivateKey, // Send the account private key
            });
            // Update the state with the deployment result
            setDeploymentResult(response.data.result);
        } catch (error) {
            // Log an error message if the request fails
            console.error('Error deploying contract:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>RuitaCR Stackup Smart Contract Generator & Deployer</h1>
            <div style={styles.section}>
                {/* Input for the template name */}
                <input
                    type="text"
                    placeholder="Template Name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    style={styles.input}
                />
                {/* Textarea for the parameters in JSON format */}
                <textarea
                    placeholder="Parameters (JSON format)"
                    value={JSON.stringify(parameters, null, 2)}
                    onChange={(e) => setParameters(JSON.parse(e.target.value))}
                    style={{ ...styles.input, ...styles.textarea }}
                />
                {/* Button to generate the contract */}
                <button onClick={handleGenerate} style={styles.button}>
                    Generate Contract
                </button>
                {/* Display the generated contract */}
                <pre style={styles.pre}>{contract}</pre>
            </div>
            <div style={styles.section}>
                {/* Input for the account address */}
                <input
                    type="text"
                    placeholder="Account Address"
                    value={accountAddress}
                    onChange={(e) => setAccountAddress(e.target.value)}
                    style={styles.input}
                />
                {/* Input for the account private key */}
                <input
                    type="password"
                    placeholder="Account Private Key"
                    value={accountPrivateKey}
                    onChange={(e) => setAccountPrivateKey(e.target.value)}
                    style={styles.input}
                />
                {/* Button to deploy the contract */}
                <button onClick={handleDeploy} style={styles.button}>
                    Deploy Contract
                </button>
                {/* Display the deployment result */}
                <pre style={styles.pre}>{deploymentResult}</pre>
            </div>
        </div>
    );
};

// Define styles object for inline styling
const styles = {
    container: {
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', // Font family for the entire app
        padding: '20px', // Padding around the container
        maxWidth: '800px', // Maximum width of the container
        margin: '0 auto', // Center the container horizontally
        background: 'linear-gradient(135deg, #000000 0%, #434343 100%)', // Gradient background from black to dark grey
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
        color: '#fff', // Text color
    },
    title: {
        textAlign: 'center', // Center align the title
        marginBottom: '20px', // Margin below the title
    },
    section: {
        marginBottom: '20px', // Margin below each section
        padding: '20px', // Padding within each section
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
    },
    input: {
        width: '100%', // Full width input
        padding: '10px', // Padding inside the input
        margin: '10px 0', // Margin around the input
        borderRadius: '5px', // Rounded corners
        border: 'none', // No border
        outline: 'none', // No outline
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
    },
    textarea: {
        height: '100px', // Fixed height for the textarea
        resize: 'none', // Disable resize handle
    },
    button: {
        width: '100%', // Full width button
        padding: '10px', // Padding inside the button
        borderRadius: '5px', // Rounded corners
        border: 'none', // No border
        background: '#764ba2', // Background color
        color: '#fff', // Text color
        cursor: 'pointer', // Pointer cursor on hover
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
        transition: 'background 0.3s', // Transition effect on hover
    },
    pre: {
        whiteSpace: 'pre-wrap', // Preserve whitespace and wrap text
        wordBreak: 'break-word', // Break words to prevent overflow
        background: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black background
        padding: '10px', // Padding inside the pre tag
        borderRadius: '5px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
    },
};

// Export the App component as the default export
export default App;
