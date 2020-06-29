const electron = require("electron");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
    //opens browser window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

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
        title: "Add New Todo",
        webPreferences: {
            nodeIntegration: true
        }
    });
    addWindow.loadURL(`file:\\${__dirname}\\add.html`);
    addWindow.on("closed", () => {
        addWindow = null
    });

}

ipcMain.on("todo:add", (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();

})

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
            label: "Clear Todos",
            click() {
                mainWindow.webContents.send('todo:clear');
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

// platform flow
if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {role: 'reload'},
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