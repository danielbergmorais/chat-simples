const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const data = require("./data")

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.removeMenu()
    win.loadFile("index.html")
}
function createWindow2() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.removeMenu()
    win.loadFile("index.html")
}


/**
 * Funções do data.js
 */
ipcMain.handle("listar-mensagens", async () => {
    return data.listarMensagens()
})

ipcMain.handle("salvar-mensagem", async (event, payload) => {

    data.salvarMensagem(payload)

    // Simulando processamento
    return {
        success: true,
        message: "Mensagem salvo com sucesso",
        obj: payload
    }
})


app.whenReady().then(createWindow)
app.whenReady().then(createWindow2)
