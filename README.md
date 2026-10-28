# Zedu About

A responsive reproduction of [zedu.chat/about](https://zedu.chat/about) with a playful Zedu social guide. Built with plain HTML, CSS, and JavaScript; no dependencies, API keys, or installation needed.

## Preview locally

Requires Node.js 20 or later.

```sh
npm run dev
```

Open `http://localhost:3000/about`. The root URL shows the same page.

## The improvement

- The actual Zedu icon floats, rings, and waves beside a friendly invitation.
- The invitation appears shortly after arrival and reopens when About Us or the icon is clicked.
- “Let’s say hi” scrolls to a new social area in the footer and briefly animates the four social links.
- Visitors can dismiss it with the close button or Escape. Dismissal lasts for the current tab session; the icon remains available.
- The guide stays out of the way when the social links are on screen.
- Keyboard focus, touch targets, mobile navigation, and reduced-motion preferences are supported.
- Social links retain the destinations from the original page: Instagram `telex.im`, TikTok `@telexim`, Facebook profile `61578751079130`, and X `teleximapp`.

## Deploy on Vercel

1. Upload the project contents to the GitHub repository you want to use.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep **Framework Preset: Other**, **Build Command: npm run build**, and **Output Directory: dist**. These settings are also included in `vercel.json`.
4. Deploy. Both `/` and `/about` serve the page.

No environment variables or paid services are required. `npm run check` verifies JavaScript syntax and local asset references. The build command validates the existing static output; no bundle is generated.

## Edit

- `dist/index.html`: copy, navigation, footer, social destinations, and invitation text.
- `dist/styles.css`: responsive layout and animations.
- `dist/app.js`: invitation, scrolling, navigation, and newsletter behavior.
- `dist/assets/`: original public Zedu artwork and typography, kept local for reliable loading.

Other product, signup, sales, and resource links lead to the original Zedu website. This reproduction does not include Zedu's backend or account flows. The newsletter form explains that signup happens on the official website; it does not collect or store addresses.

Branding, marketing copy, product screenshots, and Lato font assets were taken from the referenced public page for this requested reproduction. Zedu retains its branding and artwork rights; the Lato license is included in `dist/assets/Lato-LICENSE.txt`.
