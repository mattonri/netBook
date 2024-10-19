// get navigation functions from navigation.js
import {
  navigateTo,
  goBack,
  goForward,
  updateButtonState,
} from "./navigation.js";

navigateTo("home");

// Back arrow button
document.getElementById("backButton").addEventListener("click", goBack);
// Front arrow button
document.getElementById("forwardButton").addEventListener("click", goForward);

// Home button
document
  .getElementById("favoriteButton")
  .addEventListener("click", () => navigateTo("favorites"));

// Search button
document
  .getElementById("searchButton")
  .addEventListener("click", () => navigateTo("search"));
