const path = require('path');
const fs = require('fs');
const { electron } = require('process');
const sqlite3 = require('sqlite3').verbose();


function initializeDatabase() {
    const dbPath = path.join(app.getPath('userData'), 'netbookdb.db'); // Ensure the path is correct
    
    console.log('diagnose2')
    // Check if the database file exists; if not, create it
    if (!fs.existsSync(dbPath)) {
        // You can handle database file creation here if needed
        console.log('Database file does not exist. Creating a new one...');
        // Example: You might want to copy a default database file here
    }
    
    console.log('diagnose3')
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err);
        } else {
            console.log('Connected to SQLite database.');
        }
    });
    
    return db;
}
module.exports = {initializeDatabase}