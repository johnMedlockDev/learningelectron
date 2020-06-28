const electron = require("electron");

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on("ready", () => {
    //opens browser window
    mainWindow = new BrowserWindow({});
    //opens html file you created somewhere else
    mainWindow.loadURL(`file:\\${__dirname}\\main.html`);

    //menu instance
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    //sets the menu to the template
    Menu.setApplicationMenu(mainMenu);
});

//menu template
const menuTemplate = [{
    label: 'File'
}]