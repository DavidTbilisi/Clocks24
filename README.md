# Hourly Clock Showcase

This project displays a different famous clock from around the world for each hour of the day. The main display updates automatically based on your system time, and a carousel below allows you to browse all clocks at any time.

## Features
- **Hourly Clock Display:** Shows a unique clock image and description for each hour (0–23), with a link to more information.
- **Owl Carousel:** Browse all clocks instantly, each with a clickable image and the hour it is shown.
- **Responsive Design:** Works on desktop and mobile.

## How it Works
- The main clock image and description update every 5 minutes to match the current hour.
- The carousel below shows all 24 clocks, with the hour each is displayed.
- Clicking a clock's description or carousel image opens a relevant Wikipedia or info page.

## Setup
1. **Clone or download this folder.**
2. Make sure all images are in the `images/` directory. (Filenames should be web-friendly for best results.)
3. Open `index.html` in your browser.

## Dependencies
- [Owl Carousel 2](https://owlcarousel2.github.io/OwlCarousel2/)
- [jQuery](https://jquery.com/)
- All dependencies are loaded via CDN in `index.html`.

## File Structure
- `index.html` – Main HTML file
- `style.css` – Styles
- `script.js` – JavaScript logic
- `images/` – Clock images

## Customization
- To add or change clocks, edit the `clocks` array in `script.js`.
- To update links or descriptions, edit the corresponding object in the array.

---

Created by David. Enjoy exploring clocks from around the world!
