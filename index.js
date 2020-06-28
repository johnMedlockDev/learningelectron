const electron = require("electron");

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
    //opens browser window
    mainWindow = new BrowserWindow({});

    //opens html file you created somewhere else
    mainWindow.loadURL(`file:\\${__dirname}\\main.html`);
    mainWindow.on("closed", () => app.quit());

    //menu instance
    const mainMenu = Menu.buildFromTemplate(menuTemplate);

    //sets the menu to the template
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add New Todo"
    });
    addWindow.loadURL(`file:\\${__dirname}\\add.html`)

}

//menu template
const menuTemplate = [{
    label: 'File',
    submenu: [
        {
            label: "New Todo",
            click() {
                createAddWindow()
            }
        },
        {
            label: "Quit",
            accelerator: process.platform === 'darwin' ? 'Command+Q' : "Control+Q",
            click() {
                app.quit();
            }
        }
    ]
}]

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: "Toggle Dev Tools",
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : "Ctrl+Shift+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}