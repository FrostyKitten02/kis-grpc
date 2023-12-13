import { v4 as uuid } from 'uuid';
import grpc from '@grpc/grpc-js';
import db from "./database.mjs";

const getProduct = async (req, res) => {
    const product = db.data.products.find(p=>p.id === req.request.id)
    if (product === undefined) {
        res({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    } else {
        res({
            code: grpc.status.OK,
            details: "OK"
        }, product)
    }
}
const getProducts = (call) => {
    const products = db.data.products;
    products.forEach(p=>call.write(p))
    call.end()
}

const createProduct = async (req, res) => {
    const newProduct = req.request
    newProduct.id = uuid()
    db.data.products.push(newProduct)
    await db.write()
    res({
        code: grpc.status.OK,
        details: "OK"
    }, {id:newProduct.id})
}

const deleteProduct = async (req, res) => {
    const id = req.request.id
    const index = db.data.products.findIndex(p=>p.id === id)
    if (index < 0) {
        res(
            {
            code: grpc.status.NOT_FOUND,
            details: "Not found"
            })
        return
    }
    db.data.products.splice(index, 1)
    await db.write()
    res({
        code: grpc.status.OK,
        details: "OK"
    }, undefined)
}

const updateProduct = async (req, res) => {
    const product = req.request
    const id = product.id
    const index = db.data.products.findIndex(p=>p.id === id)
    if (index < 0) {
        res(
            {
            code: grpc.status.NOT_FOUND,
            details: "Not found"
            })
        return
    }

    db.data.products[index] = product
    await db.write()
    res({
        code: grpc.status.OK,
        details: "OK"
    }, undefined)
}

export {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}