// Google Apps Script API Configuration
const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbx-F2Z7LrxLlRUVQXcZvKRxS5sZUBiy7IBAEzC5UTHKlbCOJ241CJosLaVeI8jIc7p-/exec";

/**
 * Fetches the current collected amount from Google Sheets via Apps Script
 * and updates the display and progress bar
 */
async function fetchCollectedAmount() {
    try {
        // Fetch data from Google Apps Script
        const response = await fetch(SHEETS_API_URL, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Extract values
        const currentAmount = Number(data.totalCollected) || 0;
        const targetAmount = Number(data.totalGoal) || 50000;

        // Update the collected amount display
        const collectedAmountElement = document.getElementById("collected-amount");
        if (collectedAmountElement) {
            collectedAmountElement.textContent = "₪ " + currentAmount.toLocaleString('he-IL');
        }

        // Calculate and update progress bar
        const percentage = Math.min(100, (currentAmount / targetAmount) * 100);
        const progressInner = document.getElementById("progress-inner");
        if (progressInner) {
            progressInner.style.width = percentage + "%";
        }

        console.log(`Successfully loaded amount: ₪${currentAmount.toLocaleString('he-IL')} (${percentage.toFixed(1)}% of target)`);
        console.log(`Last update: ${data.lastUpdate}`);

    } catch (error) {
        console.error("Error fetching collected amount:", error);
        // Keep default value of 0 if fetch fails
        console.warn("Using default values due to fetch error");
    }
}

/**
 * Initialize the page when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded, fetching collected amount...");
    
    // Fetch the collected amount from Google Sheets
    fetchCollectedAmount();
    
    // Optional: Refresh data every 5 minutes (300000 ms)
    // Uncomment the line below if you want automatic updates
    // setInterval(fetchCollectedAmount, 300000);
    
    // CTA buttons are now proper links to Takbull payment page
    console.log("All CTA buttons are linked to: https://paypage.takbull.co.il/6Fn8c");
});