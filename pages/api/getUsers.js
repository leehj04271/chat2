import {MongoClient} from "mongodb";

export default async function handler(req, res) {
    const url =
        "mongodb+srv://testDb:1234@cluster0.zcag5mi.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    // MongoDB 연결

    const sogae = client.db("sogae");

    // 기존의 가입된 이메일 체크하기


    const cursor = await sogae.collection("users").find({});

    const allUsers = await cursor.toArray();

    await client.close()
    res.json({allUsers})


    // 성공시 response
}
