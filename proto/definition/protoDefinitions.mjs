import protoLoader from "@grpc/proto-loader";
import grpc from "@grpc/grpc-js";

const PRODUCT_PROTO_PATH = './proto/product.proto';
const productPackageDefinition = protoLoader.loadSync(PRODUCT_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const prodcutProtoDescriptor = grpc.loadPackageDefinition(productPackageDefinition);
const productService = prodcutProtoDescriptor.ProductService;


const STORE_PROTO_PATH = './proto/store.proto';
const storePackageDefinition = protoLoader.loadSync(STORE_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const storeProtoDescriptor = grpc.loadPackageDefinition(storePackageDefinition);
const storeService = storeProtoDescriptor.StoreService;




export {
    productService,
    storeService
}