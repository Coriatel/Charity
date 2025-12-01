# "שקל ביום" – מרכז נשמה

Landing page specification for the GitHub Pages repository `Charity`.

## Objective

- Build a **single-page fundraising landing page** titled “שקל ביום – להצלת בית יהודי אחד שלם”.
- Use the exact Hebrew content provided in the brief, grouped into sections (hero, story, challenge, solution, tiered goals, credibility, volunteer leaders, spiritual note, FAQ, progress/donation).
- Honor the visual / tonal direction of Merkaz Neshama: warm traditional colors, respectful tone, and Hebrew typography.
- Connect CTA buttons to Takbull payment: `https://paypage.takbull.co.il/6Fn8c`.
- Fetch progress data through a Google Sheets–backed API (placeholder script URL + provided API key) to display “נאסף עד כה / מתוך יעד” and animate the progress bar.

## Tech overview

- Static assets: `index.html`, `style.css`, `script.js`.
- RTL layout (`dir="rtl"`, CSS `direction: rtl; text-align: right`) and Hebrew system font stack.
- Vanilla JavaScript only (no frameworks).
- Features:
  - Smooth scrolling for in-page navigation.
  - FAQ accordion toggle.
  - Progress bar driven by Google Sheets JSON.
  - Sticky “תרומה עכשיו” button on mobile.

## Color palette & branding

- Primary teal: `#0F6C74`.
- Secondary navy: `#0B5A7A`.
- Accent copper/gold: `#D48A3A` and `#C55A1E`.
- Background warm off-white: `#F6F4EC`.
- Text: near-black `#222222`.
- Fonts: system sans-serif with Hebrew support.
- Logo path: `assets/merkaz-neshama-logo.png`.

## Section breakdown

1. **Header & nav** – show the logo, campaign name, and in-page links to key sections (campaign, story, goals, center, FAQ, donate).
2. **Hero** – use the hero lines (“בס"ד”, “במעשה קטן...”) plus CTA buttons for donation and volunteer recruitment.
3. **Story** – headline “הסיפור שלהם, הסיפור של כולנו” and the family paragraph.
4. **Challenge cards** – “חשבונות מעוקלים”, “חובות דחופים”, “הוצאות רפואיות”, “התמודדות מול הרשויות”, “תחושת טביעה איטית”.
5. **Solution – 'שקל ביום'** – highlight 30₪/month, 100₪ one-time, 100 partners plus context text.
6. **Three goals** – present the three tiers with amounts and descriptions.
7. **Merkaz Neshama credibility** – describe the center, the rabbinic mentors, and the professional support; list the rabbis’ names.
8. **Team leaders** – encourage readers to recruit 5–10 friends and include an interactive button (e.g., alert).
9. **Spiritual note** – include the quote “יותר ממה שבעל הבית עושה...” and talk about kabbalat tzedakah.
10. **FAQ** – provide answers to anonymity, fund handling, commitment length, anonymous giving.
11. **Progress & CTA** – show dynamic progress bar + “אני מצטרף” button linking to Takbull.
12. **Footer** – copyright, rabbinic support note, and contact email.

## Assets

| Name | Purpose | Notes |
| --- | --- | --- |
| `assets/merkaz-neshama-logo.png` | Header logo | Provided by user |
| `assets/hero.jpg` | Hero background | Warm home interior with bookcase and candle; see prompt from conversation |
| `assets/support.jpg` | Supporting texture | Table, tea, book, reaching hand; use prompt supplied earlier |

Prompts are already documented for generating these images with any AI tool.

## Google Sheets integration

- API key (provided by user): `AIzaSyC2D6LR0urFJr3NRDbEQGetC7Ok0xEBNDI`
- `script.js` holds:

  ```js
  const SHEETS_API_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec";
  const GOOGLE_API_KEY = "AIzaSyC2D6LR0urFJr3NRDbEQGetC7Ok0xEBNDI";
  ```

- `fetchCampaignStatus()` issues a `fetch()` to `${SHEETS_API_URL}?key=${GOOGLE_API_KEY}`, updates `totalCollected`, `totalGoal`, `lastUpdate`, and the progress fill width. On failure, fall back to defaults (e.g., 18,000/50,000) and display a friendly message.

## Next steps for you

1. Add the logo and generated images to `assets/`.
2. Deploy a Google Apps Script (or other endpoint) at `SHEETS_API_URL` that returns:

   ```json
   {
     "totalCollected": 27500,
     "totalGoal": 50000,
     "lastUpdate": "2025-11-20T10:15:00Z"
   }
   ```

3. Confirm if you want the CTA buttons to open the Takbull page in a new tab (currently they do).
4. When everything is ready, run `git add .`, `git commit`, and `git push` to your GitHub repo; the site will be live through GitHub Pages.

If you need any of those assets remixed, let me know and I’ll help craft additional prompts or adjust the code further.
