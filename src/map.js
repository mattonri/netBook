const map = L.map('map').setView([40.7128, -74.0060], 10); // Set initial view

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(map);

// Example locations
const locations = [
    [40.7128, -74.0060], // Example location 1
    [40.730610, -73.935242], // Example location 2
];

// Create markers for each location
locations.forEach(location => {
    L.marker(location).addTo(map);
});