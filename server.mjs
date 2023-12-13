import {createStore, deleteStore, getStore, getStores, updateStore} from "./storeServiceImpl.mjs";
import { getProduct, createProduct, deleteProduct, updateProduct, getProducts} from "./productServiceImpl.mjs";

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PRODUCT_PATH = './product.proto';
const PROTO_STORE_PATH = './store.proto';

//TODO move this to a separate file and also import it in client implementations!!!
const productPackageDefinition = protoLoader.loadSync(PROTO_PRODUCT_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const productProtoDescriptor = grpc.loadPackageDefinition(productPackageDefinition);
const product = productProtoDescriptor.ProductService;

const storePackageDefinition = protoLoader.loadSync(PROTO_STORE_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const storeProtoDescriptor = grpc.loadPackageDefinition(storePackageDefinition);
const store = storeProtoDescriptor.StoreService;


function getServer() {
    const server = new grpc.Server();
    server.addService(product.service, {
        GetProduct: getProduct,
        CreateProduct: createProduct,
        GetProducts: getProducts,
        DeleteProduct: deleteProduct,
        UpdateProduct: updateProduct,
    });
    server.addService(store.service, {
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