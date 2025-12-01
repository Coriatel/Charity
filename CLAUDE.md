# CLAUDE.md - AI Assistant Guide for Shekel a Day Charity Project

## Project Overview

This repository contains a Hebrew-language charity landing page for the "Shekel a Day" (שקל ביום) campaign, managed by Merkaz Neshama (מרכז נשמה). The campaign aims to help a struggling family through small, recurring monthly donations of 30 NIS (approximately one shekel per day) plus an optional one-time donation of 100 NIS.

**Project Type**: Static landing page website
**Language**: Hebrew (RTL - Right-to-Left)
**Purpose**: Charity fundraising and donor management
**Target Audience**: Hebrew-speaking donors in Israel

## Tech Stack

- **HTML5**: Semantic markup with RTL direction
- **CSS3**: Custom styling with CSS variables, no frameworks
- **JavaScript (Vanilla)**: No frameworks or build tools
- **Font**: Heebo (Google Fonts) - Hebrew-friendly font family
- **External Services**:
  - Google Sheets API (for donation tracking - not yet configured)
  - Meshulam Payment Gateway (for processing donations)

## Repository Structure

```
/Charity
├── index.html          # Main landing page (Hebrew, RTL)
├── style.css           # All styling and responsive design
├── script.js           # Client-side functionality
├── README.md           # Basic project description
├── CLAUDE.md           # This file - AI assistant guide
└── /assets
    ├── hero.png        # Hero section background image
    └── logo.jpg        # Merkaz Neshama logo
```

## Key Features & Sections

The landing page is a single-page application with the following sections:

1. **Header** (`<header>`) - Logo and navigation
2. **Hero Section** (`class="hero"`) - Main title, subtitle, progress bar, CTA
3. **Story Section** (`id="story"`) - Background story of the family
4. **Challenge Section** - Details of the financial difficulties
5. **Solution Section** - The "Shekel a Day" proposal
6. **Goals Section** (`id="goals"`) - Three-tier funding goals
7. **Soul Center Section** - About Merkaz Neshama organization
8. **Team Section** (`id="team"`) - Team leaders grid (dynamically loaded)
9. **Inspiration Section** - Hasidic/Jewish teachings on charity
10. **FAQ Section** (`id="faq"`) - Accordion-style Q&A
11. **Donate Section** (`id="donate"`) - Final CTA with donation link
12. **Footer** - Contact information

## JavaScript Functionality

### Current Implementations

1. **Smooth Scrolling**: Anchor links scroll smoothly to sections
2. **Accordion FAQ**: Expandable/collapsible Q&A items
3. **Sticky Donate Button**: Shows after scrolling 100px
4. **Progress Tracking**: Fetches donation data from Google Sheets API (not configured)
5. **Form Submission**: Handles donation form submissions (not configured)

### Important Configuration

```javascript
const SHEETS_API_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
```

**Status**: Currently using mock data. Needs actual Google Sheets Web App URL for production.

## CSS Architecture

### CSS Variables (`:root`)

```css
--primary-color: #0056b3;      /* Deep Blue */
--secondary-color: #f0c14b;    /* Gold/Yellow */
--accent-color: #e6f7ff;       /* Light Blue */
--text-color: #333;
--light-text: #fff;
--background-color: #f9f9f9;
--font-main: 'Heebo', sans-serif;
--transition-speed: 0.3s;
```

### Key Design Patterns

- **RTL Layout**: All text and layouts are right-to-left
- **Responsive Design**: Mobile-first approach with breakpoints
- **Hover Effects**: Smooth transitions on buttons and cards
- **Color Scheme**: Blue (trust) + Gold (warmth) color palette

## Development Workflow

### Making Changes

1. **Read First**: Always read the file before making changes
2. **Preserve RTL**: Maintain right-to-left text direction
3. **Test Responsiveness**: Check mobile and desktop views
4. **Hebrew Content**: Keep all user-facing text in Hebrew
5. **Accessibility**: Maintain semantic HTML structure

### Common Tasks

#### Updating Donation Goals

The three-tier goals are in `index.html` at lines 105-129:
- Goal 1: ₪10,000 one-time + ₪3,000 monthly
- Goal 2: ₪20,000 one-time + ₪5,000 monthly
- Goal 3: ₪50,000 one-time + ₪8,000 monthly

#### Updating Progress Bar

Progress is tracked via the `fetchProgress()` function in `script.js:75-93`.
Currently uses mock data (120 donors out of 1000 goal).

#### Updating Contact Information

Contact details are in the footer section (`index.html:225-234`):
- Alron Koriat: 054-320050
- Adi Avinon: 054-6354155

#### Updating Donation Link

The Meshulam payment link is at `index.html:220-221`:
```html
<a href="https://meshulam.co.il/purchase?b=e085c6f3-69f8-4060-9755-950794936306" target="_blank">
```

### Color Changes

To modify the color scheme, update CSS variables in `style.css:1-13`.

## Code Conventions

### HTML Conventions

- **Language**: `<html lang="he" dir="rtl">`
- **Semantic tags**: Use proper HTML5 semantic elements
- **Class naming**: Descriptive, kebab-case (e.g., `hero-content`, `goal-card`)
- **IDs**: Used for navigation anchors (`id="story"`, `id="goals"`, etc.)

### CSS Conventions

- **Selectors**: Class-based styling preferred over IDs
- **Units**: `rem` for font sizes, `px` for fixed dimensions
- **Responsive**: Mobile-first with `@media` queries
- **Comments**: Section headers mark major style groups

### JavaScript Conventions

- **ES6+**: Modern JavaScript (arrow functions, const/let, async/await)
- **Event Listeners**: DOMContentLoaded for initialization
- **Functions**: Named functions for each feature module
- **Error Handling**: Try-catch blocks for API calls
- **Console**: Warn/error messages for debugging

## Critical Considerations

### Hebrew & RTL Support

1. **Direction**: Always maintain `dir="rtl"` on HTML root
2. **Text Alignment**: Default to `text-align: right` for body text
3. **Layout**: Flexbox and Grid layouts should consider RTL flow
4. **Typography**: Use Hebrew-friendly fonts (Heebo is current)

### Privacy & Sensitivity

- **Anonymous Family**: The family receiving aid is kept anonymous intentionally
- **Dignity**: All content emphasizes dignity and mutual support
- **Community**: Hasidic/Jewish community values are central
- **Transparency**: FAQ section addresses donor concerns about accountability

### Performance

- **No Build Process**: Direct file editing, no bundlers
- **External Dependencies**: Minimal (Google Fonts only)
- **Images**: Optimize assets for web (hero.png, logo.jpg)
- **Lazy Loading**: Consider for images if page grows

## External Integrations

### Google Sheets API (Not Configured)

**Purpose**: Track donor information and progress
**Status**: Placeholder URL in `script.js:2`
**Setup Required**:
1. Create Google Apps Script Web App
2. Configure to accept GET (progress) and POST (submissions)
3. Replace `SHEETS_API_URL` constant

### Meshulam Payment Gateway

**Purpose**: Process recurring and one-time donations
**Current Link**: `https://meshulam.co.il/purchase?b=e085c6f3-69f8-4060-9755-950794936306`
**Integration**: External link (opens in new tab)

## Git Workflow

### Branch Naming Convention

Branches should follow the pattern:
```
claude/[description]-[session-id]
```

**Current Branch**: `claude/claude-md-mimyt0is3pg1u0fq-01B2cEf1Y79U8WGahhBs64pS`

### Important Git Rules

- **Branch Prefix**: All Claude branches MUST start with `claude/`
- **Session ID**: Branch name must end with matching session ID
- **Push Command**: Always use `git push -u origin <branch-name>`
- **No Force Push**: Never force push to main/master
- **Network Retries**: Retry failed pushes up to 4 times with exponential backoff

### Commit Messages

Follow conventional commit style:
- `feat:` for new features
- `fix:` for bug fixes
- `style:` for styling changes
- `content:` for text/content updates
- `docs:` for documentation

Hebrew commit messages are acceptable for content changes.

## Testing Checklist

When making changes, verify:

- [ ] Page loads without errors
- [ ] All navigation links work (smooth scroll)
- [ ] Sticky donate button appears after scrolling
- [ ] FAQ accordion expands/collapses correctly
- [ ] External donation link opens correctly
- [ ] Mobile responsive design works (test at 768px breakpoint)
- [ ] Hebrew text displays correctly (RTL)
- [ ] Images load properly
- [ ] No console errors

## Common Maintenance Tasks

### Updating Raised Amount

1. Configure Google Sheets API URL in `script.js:2`
2. Update spreadsheet with donor data
3. API will automatically update progress bar

### Adding Team Leaders

Team grid is in `index.html:156-159`. Currently shows "טוען נתונים..." (Loading data...).
To add team members, modify the `#team-grid` element or add dynamic loading in `script.js`.

### Modifying FAQ

FAQ items are in `index.html:180-208`. Each item follows this structure:
```html
<div class="accordion-item">
    <button class="accordion-header">Question?</button>
    <div class="accordion-content">
        <p>Answer.</p>
    </div>
</div>
```

### Changing Goal Amounts

Update the three goal cards in `index.html:110-127`. Modify both the display text and underlying calculation logic if needed.

## Security Considerations

- **No Sensitive Data**: No API keys or credentials in client-side code
- **External Payment**: Payment processing handled by Meshulam (PCI compliant)
- **CORS**: Google Sheets API may require `mode: 'no-cors'` (see `script.js:138`)
- **Input Validation**: Add validation before integrating form submission

## Accessibility Notes

- **Semantic HTML**: Proper use of headings (h1-h3)
- **Alt Text**: Add descriptive alt text to images
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **ARIA Labels**: Consider adding ARIA labels for screen readers (especially for RTL)
- **Color Contrast**: Verify WCAG compliance for text/background combinations

## Future Enhancements

Potential improvements to consider:

1. **Google Sheets Integration**: Complete the donation tracking setup
2. **Real-time Progress**: Auto-update progress bar without refresh
3. **Share Buttons**: Social media sharing functionality
4. **Testimonials**: Add donor/community testimonials section
5. **Multi-language**: Optional English version for international donors
6. **Analytics**: Add Google Analytics or similar tracking
7. **Email Notifications**: Automated thank-you emails for donors

## Support & Contact

For questions about the campaign:
- Alron Koriat: 054-320050
- Adi Avinon: 054-6354155

For technical issues with this codebase:
- Review git history for recent changes
- Check console for JavaScript errors
- Verify external API endpoints are functioning

---

**Last Updated**: 2025-12-01
**Version**: 1.0
**Maintained By**: AI assistants working with Merkaz Neshama team
