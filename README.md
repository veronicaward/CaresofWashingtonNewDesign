# Cares of Washington — Website Redesign

Static HTML/CSS/JS prototype for the Cares of Washington nonprofit website.

## Structure

```
/
├── index.html                  # Homepage
├── assets/
│   ├── css/styles.css          # Global stylesheet
│   ├── js/nav.js               # Navigation, drawer, toast notifications
│   ├── cares-logo.png
│   └── logo-carf.webp
├── get-services/
│   ├── index.html              # Services overview
│   ├── apply.html              # Application form (shared across services)
│   ├── ticket-to-work.html
│   ├── connect-for-success.html
│   ├── employment-training.html
│   ├── foundational-community-services.html
│   ├── developmental-disabilities.html
│   └── vocational-rehabilitation.html
├── about/
│   ├── who-we-are.html
│   ├── contact.html
│   ├── send-message.html       # Contact form
│   └── blog.html
├── partners/
│   ├── employment-partners.html
│   └── foundation-funders.html
├── who-we-serve/
│   └── index.html
├── give/
│   └── donate.html
└── impact-stories/
    └── index.html
```

## Running locally

Open any `.html` file directly in a browser — no build step or server required.

## Notes

- All paths are relative so the site works from `file://` without a local server
- Toast notifications use `sessionStorage` to persist confirmation messages across page navigation
- The apply form reads a `?service=` URL parameter to display the relevant service name
