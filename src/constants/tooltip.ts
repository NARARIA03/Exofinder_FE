export const OBSERVED_TIP =
  "Most of what you are currently seeing are host stars, not exoplanets. To observe a planet, its SNR (Signal-to-Noise Ratio) must be greater than 5, and its ES max value must be larger than the distance to the planet from the HWO. Move the telescope around to find these exoplanets!";
export const OBSERVED_DIFFICULTY_TIP =
  "Level 1 : Exoplanets can be easily observed using the coronagraph (direct imaging) method. \nLevel 2 : The exoplanet may appear faint or merged with its host star.\nLevel 3 : This exoplanet is difficult to observe due to the brightness of the host star.";
export const ZOOM_TIP = "Zoom in and zoom out the HWO telescope!";

export const DIAMETER_TIP =
  "The larger the diameter of the HWO telescope, the stronger its separability becomes, allowing you to observe more exoplanets. The number colored in red and the red-marked planets on the observation screen indicate how many additional exoplanets can be observed if the diameter is increased by 1 meter. It's surprising how much of a difference 1 meter can make, right?";

export const ORIENTATION_TIP =
  "This indicates the direction the HWO telescope is currently pointing. Right Ascension represents the angular east-west position of a celestial object relative to the celestial equator. Declination indicates the angular position of an object north or south of the celestial equator.";

export const CORONA_TIP =
  "The coronagraph is one of the key features of the HWO. A coronagraph blocks out the intense light from a star, allowing you to observe the faint exoplanets around it more easily. Turn on the coronagraph to block the host star and observe the exoplanets more clearly! Unfortunately, not all exoplanets can be observed even after applying the coronagraph. Two crucial parameters that determine this are the SNR (Signal-to-Noise Ratio) and the ES max value of that exoplanet.";

export const PREV_NEXT_BTN_TOOLTIP =
  "If there are multiple planets orbiting this host star, press the button on the left to check the details of other planets!";

export const POSITION_TOOLTIP =
  "The HWO telescope is located at the L2 Lagrange point, which changes position as the Earth orbits the Sun. Since the orbit of the L2 point is much shorter compared to the distance from the Solar System to exoplanets, the observation date doesn't significantly affect exoplanet observation but has a major impact on Earth's position. Try changing the observation date to locate Earth!";

export const EXOPLANET_INFO_TOOLTIP =
  "The range of the habitable zone is defined by the following process. First, the absolute magnitude of the host star is calculated based on the distance from the HWO to the exoplanet system and the apparent magnitude of the host star. Then a radiative correction is applied according to the spectral type of the host star, and the luminosity of the host star is derived. Finally, the inner and outer boundaries are determined using the luminosity.";

export const SPECTRAL_TOOLTIP =
  "Stars can be classified into 7 different types based on their spectral characteristics. The closer the class is to the left (letter O), the hotter the star, while the closer it is to the right (letter M), the cooler the star. Hover your mouse cursor to distinguish the stars on the observation screen.";
