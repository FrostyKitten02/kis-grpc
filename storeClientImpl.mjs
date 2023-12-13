import protoLoader from "@grpc/proto-loader";
import grpc from "@grpc/grpc-js";

const STORE_PROTO_PATH = './store.proto';


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
    storeService
}