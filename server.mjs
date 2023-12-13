const PROTO_PATH = './details.proto';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import {
    getProduct, createProduct, deleteProduct, updateProduct, getProducts,
} from "./serviceImpl.mjs";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const product = protoDescriptor.ProductService;

function getServer() {
    const server = new grpc.Server();
    server.addService(product.service, {
        TestConnection: (req, res) => {
            console.log(req.request);
            res(null, {
                message: "Connection is working!"
            });
        },
        GetProduct: getProduct,
        CreateProduct: createProduct,
        GetProducts: getProducts,
        DeleteProduct: deleteProduct,
        UpdateProduct: updateProduct,
    });
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