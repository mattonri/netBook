const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("node:path");
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create an empty menu to disable the current one
  const blankMenu = Menu.buildFromTemplate([]);
  
  // Set the blank menu as the application menu
  Menu.setApplicationMenu(blankMenu);
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 2100,
    height: 1400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    
  });
  
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// Navigation logic
ipcMain.on('navigate-to', (event, page) => {
  // Handle navigation logic, perhaps updating the window's contents
  console.log(`Navigating to: ${page}`);
});

ipcMain.on('go-back', (event) => {
  // Handle going back in navigation
  console.log('Going back');
});

ipcMain.on('go-forward', (event) => {
  // Handle going forward in navigation
  console.log('Going forward');
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on('will-quit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database closed.');
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Set up paths
const dbPath = path.join(app.getPath('userData'), 'netbookdb.db');
const srcDbPath = path.join(__dirname, 'src', 'netbookdb.db'); // Adjust this path to your actual src folder

// Check if the database exists in userData, and if not, copy it from src
if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(srcDbPath, dbPath);
    console.log('Database copied to userData directory.');
}

// Create a new database instance
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

//DataBase Stuff
// create a table and insert a row
db.serialize(() => {
  db.run("CREATE TABLE Users (name, lastName)");
  db.run("INSERT INTO Users VALUES (?, ?)", ['foo', 'bar']); 
});
ipcMain.handle('db-query', async (event, sqlQuery) => {
  return new Promise((resolve, reject) => {
      db.all(sqlQuery, (err, rows) => {
          if (err) {
              console.error('Database query error:', err.message);
              return reject(err); // Reject the promise if there is an error
          }
          resolve(rows);
      });
  });
});