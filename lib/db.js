import { MongoClient } from "mongodb";

export async function getClient() {
    let client;
    let clientPromise;

    client = new MongoClient(
        "mongodb+srv://testDb:1234@cluster0.zcag5mi.mongodb.net/?retryWrites=true&w=majority"
    );
    clientPromise = client.connect();


    return clientPromise;
}
