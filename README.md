# Power Apps Freelancer Portfolio

A modern, responsive portfolio website for Power Apps, Power Automate, and SharePoint services built with HTML, CSS, and JavaScript.

## Project Structure

```
Business-Website/
├── index.html           # Main HTML file
├── impressum.html       # Legal impressum page
├── datenschutz.html     # GDPR Data Privacy page
├── css/
│   └── style.css       # Main stylesheet with dark mode support
├── js/
│   └── script.js       # JavaScript with theme & language switching
├── images/             # Image assets
├── assets/             # Other static assets
└── README.md           # This file
```

## Features

- **Light & Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Multi-Language Support**: English and German language switcher (expandable to more languages)
- **Responsive Design**: Mobile-first approach with media queries for all devices
- **Professional Portfolio**: Showcase your Power Apps expertise
- **Service Showcase**: Highlight Power Apps, Power Automate, and SharePoint services
- **Project Portfolio**: Display sample projects and case studies
- **Social Media Links**: Direct integration with LinkedIn, GitHub, YouTube, and Email
- **Simple Contact**: Mailto button for easy client inquiries
- **Legal Pages**: GDPR-compliant Impressum and Data Privacy pages
- **Smooth Scrolling**: Navigation links with smooth scroll behavior
- **Interactive Elements**: Hover effects and animations with scroll observers
- **SEO Friendly**: Proper HTML structure and meta tags
- **FontAwesome Icons**: Professional icons for social links and theme toggle

## Sections

1. **Navigation Bar** - Sticky header with theme toggle, language switch, and navigation links
2. **Hero Section** - Eye-catching landing area with call-to-action
3. **About Section** - Information about your expertise
4. **Services Section** - Display your three main services with icons
5. **Projects Section** - Sample projects and case studies
6. **Contact Section** - Call-to-action with mailto button and social links
7. **Footer** - Copyright, Impressum, and Data Privacy links

## Getting Started

1. Open `index.html` in your web browser
2. Customize the content:
   - Update your name/branding in the navigation logo
   - Replace email addresses with your actual contact email
   - Update social media links (LinkedIn, GitHub, YouTube)
   - Add a professional photo to the `images/` folder
   - Update the About section with your background
   - Customize sample projects
   - Update contact information

## Customization Guide

### Update Contact Information
Replace all instances of `your-email@example.com` with your real email address in:
- `index.html` - Contact section mailto link
- `impressum.html` - Contact details
- `datenschutz.html` - Contact details

### Update Social Links
In `index.html`, update the social links section:

```html
<a href="https://linkedin.com/in/yourprofile" target="_blank" title="LinkedIn">
<a href="https://github.com/yourprofile" target="_blank" title="GitHub">
<a href="https://youtube.com/@yourprofile" target="_blank" title="YouTube">
<a href="mailto:your-email@example.com" title="Email">
```

### Dark Mode & Language Switching

The website automatically includes:
- **Theme Toggle**: Button in navbar to switch between light/dark mode
- **Language Switch**: Dropdown to switch between English/Deutsch
- **Persistent Storage**: User preferences are saved in browser localStorage

All text with `data-en` and `data-de` attributes will automatically switch with language selection.

### Add More Languages

To add another language (e.g., French):

1. Add option to language switcher in `index.html`:
```html
<option value="fr">Français</option>
```

2. Add language attributes to content elements:
```html
<h1 data-en="Title" data-de="Titel" data-fr="Titre">Title</h1>
```

3. Update the `setLanguage()` function in `js/script.js` to handle the new language.

### Modify Colors

Colors are now defined as CSS variables in `css/style.css`:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #333333;
    /* ... more variables ... */
}
```

Update these in both light and dark mode sections to customize the color scheme globally.

### Update Legal Pages

Edit `impressum.html` and `datenschutz.html` to include:
- Your full name
- Your address
- Your phone number
- Your professional information
- Any business registration details
- Insurance information if applicable

**Important**: Make sure these legal pages are accurate and compliant with German law if you're targeting German clients.

### Add Images

1. Place images in the `images/` folder
2. Reference them in HTML using relative paths: `<img src="images/your-image.jpg" alt="Description">`
3. Optimize images for web (use tools like TinyPNG)

### Expand Services or Projects

Add more service cards:

```html
<div class="service-card">
    <div class="service-icon">🎯</div>
    <h3 data-en="Service Name" data-de="Service Name">Service Name</h3>
    <p data-en="Description" data-de="Beschreibung">Description</p>
</div>
```

Same format for project cards in the Projects section.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. Optimize images before uploading (use tools like TinyPNG or ImageOptim)
2. Use CSS instead of JavaScript where possible
3. Minimize JavaScript for faster loading
4. Consider adding a CDN for faster asset delivery
5. Enable GZIP compression on your server
6. Lazy load images for better performance

## Deployment Options

Ready to deploy? Popular options include:

- **GitHub Pages** - Free hosting for static sites (just push to GitHub)
- **Netlify** - Simple drag-and-drop deployment with continuous deployment
- **Vercel** - High-performance hosting for static sites
- **Firebase Hosting** - Google's static hosting solution
- **Traditional Hosting** - Any web hosting provider (FTP upload)

### Deploy on GitHub Pages

1. Create a GitHub repository named `your-username.github.io`
2. Push your website files to the repository
3. Your site will be live at `https://your-username.github.io`

### Deploy on Netlify

1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository for automatic deployments
3. Your site gets a live URL immediately

## Browser Storage & Performance

- **localStorage**: Used to store theme preference and language selection
- **Intersection Observer**: Used for scroll animations (no heavy libraries)
- **No external dependencies**: Vanilla JavaScript only (FontAwesome via CDN for icons)
- **Lightweight**: Fast loading times

## SEO Best Practices

1. Update meta descriptions in HTML head
2. Use proper heading hierarchy (H1, H2, H3)
3. Add alt text to all images
4. Create XML sitemap (optional but recommended)
5. Add structured data (Schema.org) for better search results
6. Ensure mobile-responsiveness (check with Google Mobile-Friendly Test)
7. Use descriptive URLs and file names

## Security & Compliance

- All form submissions use standard mailto links (no server-side processing required)
- No sensitive data collection
- GDPR-compliant privacy policy included
- Impressum page for German/EU compliance
- SSL/TLS recommended for production (most hosting providers offer free SSL)
- No external tracking or analytics by default

## Troubleshooting

### Theme Toggle Not Working
- Check that `localStorage` is enabled in browser
- Verify `js/script.js` is loaded correctly
- Check browser console for JavaScript errors

### Language Switch Not Working
- Verify all text elements have both `data-en` and `data-de` attributes
- Check that language code is correct in HTML (should be 'en' or 'de')
- Clear browser cache and reload

### Styling Issues
- Clear CSS cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check for typos in class names
- Verify `css/style.css` is loaded in HTML head

### Social Links Not Appearing
- Check FontAwesome CDN link in HTML head is correct
- Verify social link URLs are properly formatted
- Open browser console to check for any loading errors

## Enhancements to Consider

- Add portfolio/case studies section with project images
- Implement a newsletter signup form
- Add blog section for Power Apps tips and best practices
- Add testimonials from clients
- Create detailed service pages
- Add contact form backend (Formspree, EmailJS, etc.) to send emails
- Set up analytics (Google Analytics, Plausible, etc.)
- Create video content or animations
- Add skills/certifications showcase
- Add blog for technical articles

## License

This project is open source and available for personal and commercial use.

---

**Created**: April 2026
**Last Updated**: April 2026
**Version**: 2.0 (with Dark Mode, Multi-Language, and Legal Pages)
