// Google Sheets API Configuration
// Replace these values with your actual spreadsheet ID and API key
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
const API_KEY = "YOUR_API_KEY_HERE";
const RANGE = "Sheet1!B2";
const TARGET_AMOUNT = 50000; // Target amount for progress bar

/**
 * Fetches the current collected amount from Google Sheets
 */
async function fetchCollectedAmount() {
    try {
        // Build the API URL
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${API_KEY}`;

        // Fetch data from Google Sheets
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Extract the value from the response
        if (data.values && data.values[0] && data.values[0][0]) {
            const currentAmount = parseFloat(data.values[0][0]);

            if (!isNaN(currentAmount)) {
                updateDisplay(currentAmount);
            } else {
                console.error('Invalid number format in cell');
            }
        } else {
            console.error('No data found in the specified cell');
        }
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        // Keep the default value of 0 on error
    }
}

/**
 * Updates the display with the collected amount and progress bar
 */
function updateDisplay(currentAmount) {
    // Update the collected amount display
    const collectedElement = document.getElementById('collected-amount');
    if (collectedElement) {
        collectedElement.textContent = `₪ ${currentAmount.toLocaleString('he-IL')}`;
    }

    // Calculate and update progress bar
    const percentage = Math.min(100, (currentAmount / TARGET_AMOUNT) * 100);
    const progressBar = document.getElementById('progress-inner');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the collected amount
    fetchCollectedAmount();

    // Optional: Refresh data every 5 minutes (300000 milliseconds)
    // Uncomment the line below if you want automatic refresh
    // setInterval(fetchCollectedAmount, 300000);
});
