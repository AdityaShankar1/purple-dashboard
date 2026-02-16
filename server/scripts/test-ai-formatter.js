import axios from 'axios';

const runTest = async () => {
    try {
        console.log("Testing AI Response Formatter...");
        const response = await axios.post('http://127.0.0.1:5001/api/ai/summarize-dashboard', {
            userPrompt: "What is my security status?",
            history: []
        });

        console.log("\n--- AI RESPONSE ---");
        console.log(response.data.summary);
        console.log("-------------------\n");
        console.log(`Source: ${response.data.isMock ? "Mock Data" : "Real Data"}`);

    } catch (error) {
        console.error("Test failed:", error.response ? error.response.data : error.message);
    }
};

runTest();
