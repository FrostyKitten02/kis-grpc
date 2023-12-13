import { JSONPreset } from 'lowdb/node'
import { v4 as uuid } from 'uuid';
import grpc from '@grpc/grpc-js';

const defaultData = { products: [], stores: [] }
const db = await JSONPreset('db.json', defaultData)


const getStore = (req, res) => {
    const store = db.data.stores.find(s=>s.id === req.request.id)
    if (store === undefined) {
        res({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    } else {
        res({
            code: grpc.status.OK,
            details: "OK"
        }, store)
    }
}


const createStore = async (req, res) => {
    const newStore = req.request
    newStore.id = uuid()
    db.data.stores.push(newStore)
    await db.write()
    res({
        code: grpc.status.OK,
        details: "OK",
    }, {id:newStore.id})
}

const getStores = (call) => {
    const stores = db.data.stores;
    stores.forEach(s=>call.write(s))
    call.end()
}

const deleteStore = async (req, res) => {
    const id = req.request.id
    const index = db.data.stores.findIndex(s=>s.id === id)
    if (index < 0) {
        res(
            {
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        return
    }
    db.data.stores.splice(index, 1)
    await db.write()
    res({
        code: grpc.status.OK,
        details: "OK"
    }, undefined)
}

const updateStore = async (req, res) => {
    const store = req.request
    const id = store.id
    const index = db.data.stores.findIndex(s=>s.id === id)
    if (index < 0) {
        res(
            {
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        return
    }

    db.data.stores[index] = store
    await db.write()
    res({
        code: grpc.status.OK,
        details: "OK"
    }, undefined)
}


export {
    getStore,
    createStore,
    getStores,
    deleteStore,
    updateStore
}
