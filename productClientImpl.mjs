import protoLoader from "@grpc/proto-loader";
import grpc from "@grpc/grpc-js";

const PRODUCT_PROTO_PATH = './product.proto';
const productPackageDefinition = protoLoader.loadSync(PRODUCT_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const prodcutProtoDescriptor = grpc.loadPackageDefinition(productPackageDefinition);
const productService = prodcutProtoDescriptor.ProductService;


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

export {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    productService
}