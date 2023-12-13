
function createStore(client, Store) {
    client.CreateStore(Store, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function getStore (client, id) {
    client.GetStore({id: id}, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function getStores (client) {
    const stream = client.GetStores()
    stream.on("data", (chunk) => {
        console.log(chunk)
    })
    stream.on("end", () => {
        console.log("Stream data received.")
    })
}


function deleteStore(client, id) {
    client.DeleteStore({id: id}, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function updateStore(client, Store) {
    client.UpdateStore(Store, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

export {
    createStore,
    getStore,
    getStores,
    deleteStore,
    updateStore,
}