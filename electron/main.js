const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const data = require("./data")

function createWindow() {
    // Tamanho das janelas
    const width = 800
    const height = 600

    const win = new BrowserWindow({
        width: width,
        height: height,
        x: 100,    // distância da borda esquerda da tela
        y: 100,    // distância da borda superior da tela
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.removeMenu()
    win.loadFile("index.html")


    // Posição da segunda janela (à direita da primeira)
    const win2 = new BrowserWindow({
        width,
        height,
        x: 100 + width + 20, // 20px de espaço entre as janelas
        y: 100,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    win2.removeMenu()
    win2.loadFile("index.html")

}

/**
 * Funções do data.js
 */
ipcMain.handle("listar-mensagens", async () => {
    return data.listarMensagens()
})

ipcMain.handle("salvar-mensagem", async (event, payload) => {

    // Poderia ter uma validação de payload

    // Envia o payload para a função que salva
    data.salvarMensagem(payload)

    // Resposta do processo
    return {
        success: true,
        message: "Mensagem salvo com sucesso",
        obj: payload
    }
})


app.whenReady().then(createWindow)
