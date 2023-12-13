import grpc from '@grpc/grpc-js';
import {storeService, productService} from "./proto/definition/protoDefinitions.mjs";

function run() {
    try{
        const server = '0.0.0.0:50051'
        const productClient = new productService(server, grpc.credentials.createInsecure());
        const storeClient = new storeService(server, grpc.credentials.createInsecure());

        productClient.close()
        storeClient.close()
    } catch (error) {
        console.error(error);
    }
}

run()
