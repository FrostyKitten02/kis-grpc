const PROTO_PATH = './details.proto';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

//tested
function createProduct(client, product) {
    client.CreateProduct(product, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}
//tested
function getProduct (client, id) {
    client.GetProduct({id: id}, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}
//tested
function getProducts (client) {
    const stream = client.GetProducts()
    stream.on("data", (chunk) => {
        console.log(chunk)
    })
    stream.on("end", () => {
        console.log("Stream data received.")
    })
}

//tested
function deleteProduct(client, id) {
    client.DeleteProduct({id: id}, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function updateProduct(client, product) {
    client.UpdateProduct(product, (error, result) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(result);
    })
}

function run() {
    try{
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const productService = protoDescriptor.ProductService;
        const client = new productService('0.0.0.0:50051', grpc.credentials.createInsecure());
        getProduct(client, "72eb2fbc-120f-4afd-a97a-3f44b5028acd")

        client.close()
    } catch (error) {
        console.error(error);
    }
}

run()
