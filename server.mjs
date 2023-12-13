import {createStore, deleteStore, getStore, getStores, updateStore} from "./serviceImpl/storeServiceImpl.mjs";
import { getProduct, createProduct, deleteProduct, updateProduct, getProducts} from "./serviceImpl/productServiceImpl.mjs";
import {storeService, productService} from "./proto/definition/protoDefinitions.mjs";

import grpc from '@grpc/grpc-js';


function getServer() {
    const server = new grpc.Server();
    server.addService(productService.service, {
        GetProduct: getProduct,
        CreateProduct: createProduct,
        GetProducts: getProducts,
        DeleteProduct: deleteProduct,
        UpdateProduct: updateProduct,
    });
    server.addService(storeService.service, {
            GetStore: getStore,
            CreateStore: createStore,
            GetStores: getStores,
            DeleteStore: deleteStore,
            UpdateStore: updateStore,
        }
    )


    return server;
}

const productServer = getServer();

productServer.bindAsync('0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("Server is listening on port " + port)
        productServer.start();
    });