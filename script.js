// Configuration
const SHEETS_API_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE'; // User needs to replace this

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initAccordion();
    initStickyDonate();
    initFormSubmission();
    fetchProgress();
});

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all others
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// Sticky Donate Button Visibility
function initStickyDonate() {
    const stickyBtn = document.querySelector('.sticky-donate');
    const heroSection = document.querySelector('.hero');

    if (!stickyBtn || !heroSection) return;

    // Initially hide it if we are at the top (optional, or keep it always visible)
    // Let's make it appear after scrolling past 100px
    stickyBtn.style.transform = 'translateY(100px)'; // Hide initially

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            stickyBtn.style.transform = 'translateY(0)';
        } else {
            stickyBtn.style.transform = 'translateY(100px)';
        }
    });
}

// Fetch Progress from Google Sheets
async function fetchProgress() {
    if (SHEETS_API_URL === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE') {
        console.warn('Google Sheets API URL not set. Using mock data.');
        updateProgressUI(120, 1000); // Mock data
        return;
    }

    try {
        const response = await fetch(SHEETS_API_URL);
        const data = await response.json();
        // Assuming API returns { totalDonors: number }
        if (data && data.totalDonors) {
            updateProgressUI(data.totalDonors, 1000);
        }
    } catch (error) {
        console.error('Error fetching progress:', error);
        updateProgressUI(0, 1000); // Fallback
    }
}

function updateProgressUI(current, goal) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (!progressBar || !progressText) return;

    const percentage = Math.min((current / goal) * 100, 100);

    progressBar.style.width = percentage + '%';
    progressBar.textContent = Math.round(percentage) + '%';
    progressText.textContent = `גייסנו ${current} מתוך ${goal} שותפים`;
}

// Form Submission
function initFormSubmission() {
    const form = document.getElementById('donationForm');
    const messageDiv = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (SHEETS_API_URL === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE') {
            messageDiv.textContent = 'תודה! (מצב הדגמה - הטופס לא נשלח באמת)';
            messageDiv.style.color = 'green';
            form.reset();
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'שולח...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Using no-cors mode for simple submission if needed, or standard POST
            // Apps Script often requires specific handling for CORS
            await fetch(SHEETS_API_URL, {
                method: 'POST',
                mode: 'no-cors', // Often needed for Google Apps Script Web App
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            messageDiv.textContent = 'תודה רבה! הצטרפת בהצלחה.';
            messageDiv.style.color = 'green';
            form.reset();

            // Optimistically update progress
            // fetchProgress(); 

        } catch (error) {
            console.error('Error submitting form:', error);
            messageDiv.textContent = 'אירעה שגיאה בשליחה. אנא נסה שוב.';
            messageDiv.style.color = 'red';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}
