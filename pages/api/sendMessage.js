import {MongoClient} from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }

    const url =
        "mongodb+srv://testDb:1234@cluster0.zcag5mi.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    // MongoDB 연결

    const sogae = client.db("sogae");

    const data = req.body;

    const {message, sender, receiver} = data;

    // 기존의 가입된 이메일 체크하기
    try {
        const _id = await sogae.collection("chats").findOne({
                                                                email: sender
                                                            });


        const existingChats = await sogae.collection('chats').findOne({
                                                                          participants: {$all: [sender, receiver]}
                                                                      });
        if (!existingChats) {
            await sogae.collection("chats").insertOne({participants: [sender, receiver]})

        }

        await sogae.collection("messages").insertOne({message, sender, receiver})

        res.status(201).json('success')
    } catch {
        res.status(404).json({message: "error"});
    }
    await client.close();
    res.status(201)
    // 성공시 response
}

