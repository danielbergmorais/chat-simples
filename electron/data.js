let Store;

async function initStore() {
    const mod = await import("electron-store");
    Store = mod.default;
    return new Store({ name: "chat" });
}

let storePromise = initStore();

async function listarMensagens() {
    const store = await storePromise;

    return store.get("historico", []);
}

async function salvarMensagem(mensagem) {
    const store = await storePromise;

    const msgs = store.get("historico", []);
    msgs.push(mensagem);

    store.set("historico", msgs);
}

module.exports = {
    listarMensagens,
    salvarMensagem
}
