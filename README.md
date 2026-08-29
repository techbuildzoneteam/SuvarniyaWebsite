# Thaventhirakumar Suvarniya — Portfolio

A clean, minimal, responsive personal portfolio website.

## File structure

```
portfolio/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── images/
│   │   └── profile.jpg      ← replace with a real photo
│   │
│   ├── cv/
│   │   └── suvarniya-cv.pdf ← replace with the real CV file
│   │
│   └── favicon/
│
└── README.md
```

## Personalizing content

Almost everything is editable from the top of `script.js`:

- `portfolioData` — name, role, email, phone, location, CV path, profile image path
- `socialLinks` — GitHub, LinkedIn, email
- `experience` — work history entries
- `education` — education entries
- `projects` — empty by default; add objects with `title`, `description`,
  `image`, `technologies`, `githubUrl`, `liveUrl`, `category` as they become
  available

## Adding real images/files

1. Save a profile photo to `assets/images/profile.jpg`.
2. Save the CV as `assets/cv/suvarniya-cv.pdf`.
3. Add a favicon to `assets/favicon/`.

If `profile.jpg` is missing, the hero section shows a clean placeholder
instead of a broken image.

## Connecting the contact form

The site is static, so the contact form does not send messages on its own.
Open `script.js` and look for `CONTACT_FORM_CONFIG` near the bottom — set
`endpoint` to a provider such as Formspree, Web3Forms, EmailJS, or your own
backend, and update `sendMessage()` if the request shape needs to change.

## Theming

Light and dark themes are implemented with CSS variables in `style.css`.
The user's preference is remembered in `localStorage`, and the site
defaults to the operating system's preferred color scheme on first visit.

## Browser support

Modern evergreen browsers. Uses `IntersectionObserver`, CSS custom
properties, and `color-mix()`.
