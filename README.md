# Hourly Clock Showcase - Vue.js Edition

A beautiful web application that displays 24 historic clocks from around the world, showing a different clock each hour. Now built with Vue.js 3!

## Features

- **Hourly Clock Display**: Shows a different historic clock every hour (12:00 displays the oldest clock from 1344)
- **Live Time**: Displays current time that updates every 5 minutes
- **Interactive Carousel**: Browse all 24 clocks with navigation controls and dots
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Vue.js 3**: Built with modern Vue.js using Composition API
- **No Dependencies**: Self-contained Vue app with no external libraries needed

## Technology Stack

- **Vue.js 3**: Modern reactive framework with Composition API
- **Vanilla CSS**: Custom styled with beautiful gradients and animations
- **Pure JavaScript**: No jQuery or external carousel libraries

## Vue.js Components

### ClockShowcase Component
- Main application component
- Manages current time and clock display
- Updates every 5 minutes to show the correct hourly clock

### ClockCarousel Component
- Custom Vue carousel implementation
- Responsive design (1/3/5 items on mobile/tablet/desktop)
- Navigation buttons and dot indicators
- Smooth transitions and hover effects

## Clock Collection

Features 24 historic clocks spanning from 1344 to 2011:
1. Torre dell'Orologio (Padua, Italy) – 1344
2. Zytglogge (Bern, Switzerland) – c. 1405
3. Prague Astronomical Clock – 1410
...and 21 more historic timepieces!

## Usage

Simply open `index.html` in any modern web browser. The application will:
1. Display the current time
2. Show the appropriate clock for the current hour
3. Allow browsing of all clocks via the carousel below

## Development

The project uses Vue 3 CDN for easy setup. No build process required - just open the HTML file!

### File Structure
```
index.html - Vue.js app container
script.js - Vue components and application logic
style.css - Styling and responsive design
clocks.json - Clock data in JSON format
images/ - Clock images from around the world
```

## Data Structure

The clock data is now stored in `clocks.json` for better organization and maintainability. Each clock entry contains:
- `src`: Path to the clock image
- `desc`: Description with location and year
- `link`: Wikipedia or reference URL

This separation makes it easy to:
- Update clock data without touching the code
- Add new clocks by editing the JSON file
- Maintain data consistency
- Enable future features like data validation

## Migration from Original

This version has been converted from a vanilla JavaScript + jQuery project to Vue.js 3:
- Replaced jQuery/Owl Carousel with custom Vue carousel component
- Implemented reactive data binding for clock updates
- Used Vue Composition API for modern, maintainable code
- Maintained all original functionality and styling

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
