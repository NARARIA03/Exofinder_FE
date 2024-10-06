# 2024 NASA Space Apps Challenge

---

## Theme: Navigator for the Habitable Worlds Observatory (HWO)_ Mapping the Characterizable Exoplanets in our Galaxy

---

## implements this

### Star and Exoplanet Visualization Page

1. **Coordinate Calculation:**
   - Visualize stars and exoplanets using NASA Exoplanet Archive data.
     - Use RA, DEC, and Distance data to calculate the coordinates of exoplanetary systems.
     - Calculate the orbital paths of exoplanets based on semiMajorAxis and eccentricity values.
2. **Star and Exoplanet Visualization:**
   - All host stars are visualized by default.
   - For exoplanets, only those that meet the conditions of SNR > 5 and ESmax > Distance are visualized.
3. **HWO Settings Panel:**
   - When the user adjusts the Diameter value in the HWO Settings, the number of visualized exoplanets changes in real-time, with observable planets displayed in green orbits and non-observable planets displayed in red orbits.
   - Green orbits indicate planets that are observable at the current Diameter, while red orbits indicate planets that would be observable if the Diameter is increased by 1m.
   - The number of additional exoplanets that become observable when the Diameter is increased by 1m is calculated in real-time, and users can view this information in the HWO Settings panel.
   - The Zoom setting allows users to zoom in or out, and the number of observable planets and their names are updated in real-time as the zoom changes.
   - As the user rotates the view, the RA and DEC values update in real-time, reflecting the current direction HWO is facing.
   - HWO is planned to be located at the second Lagrange point (L2), and to make the visualization more realistic, Earth’s position is shown for March and September, reflecting HWO’s location.
   - A "What is HWO?" clickable element is placed to help users learn more about HWO, linking to the official NASA website.
4. **Observed Panel:**
   - When the user hovers over an exoplanet name, a highlight effect is applied to visually emphasize the selected exoplanet.
   - The number of exoplanets and stars visible in HWO’s current field of view is calculated and displayed in real-time.
   - Clicking on an exoplanet name zooms in on the corresponding planetary system and provides more detailed information.

### Planetary System Zoom Page

1. **Star and Exoplanet Visualization:**
   - The host star, exoplanets, and their orbits are visualized at a closer, scaled view, showing the real-time orbital motion of the planets around the host star.
   - The selected exoplanet’s orbital path is highlighted in yellow, while the other exoplanet orbits are shown in white.
2. **Planet Information Panel:**
   - Information about the selected exoplanet, including the planet’s name (planetName), host star’s name (hostName), location (RA, DEC, Distance), summary, and Earth similarity score (calculated by team members and received via the backend), is displayed.
   - If multiple exoplanets exist in the same system, the user can switch between exoplanets using the previous/next buttons.
3. **HWO Settings Panel:**
   - If there are exoplanets observed using Direct Imaging in the zoomed-in system, the corona graph can be activated.
   - For exoplanets not observed by Direct Imaging but detected through other methods, the planets are visualized virtually, and the corona graph cannot be activated.
   - 3-1. **Coronagraph:**
        - The number of exoplanets detected using coronagraphs is currently limited, but improved hardware capabilities of the Habitable Worlds Observatory (HWO) are expected to significantly increase this number.
        - The effective area for the coronagraph method was estimated based on distances and signal-to-noise ratio (SNR) values of previously observed exoplanets.
        - In the accompanying figure, blue points indicate planets observed with existing coronagraphic methods, while green points represent exoplanets detected by alternative methods.
        - The red area was determined using Kernel Density Estimation (KDE) for potential observations with the coronagraph.
        - During visualization, clicking the Corona Graph button blocks the star's light, allowing the observation of obscured planets, but only within the predefined area.
4. **Go back to HWO Button:**
   - A "Go back to HWO" button is provided to return to the star and exoplanet visualization page.

---

## Tech Stack

- Build & Bundler: `Vite`
- Framework: `React`
- Language: `TypeScript`
- CSS & Styling: `tailwindCSS`
- Global statement manager: `Jotai`
- Http request: `axios`
- WebGL (3D): `Three`, `@react-three/fiber`, `@react-three/drei`, `gsap`
- Icons: `react-icons`
- Deploy: `gh-pages`

---

## How To Start

```shell
yarn
echo "VITE_API_URL=..." >> .env
yarn dev
```

---
