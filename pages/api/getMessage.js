import {MongoClient} from "mongodb";

export default async function handler(req, res) {

    const url =
        "mongodb+srv://testDb:1234@cluster0.zcag5mi.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    // MongoDB 연결

    const sogae = client.db("sogae");

    // 기존의 가입된 이메일 체크하기
    try {

        console.log('ss', `${req.query.part}`, req.query.me)

        const chats = sogae.collection("messages").find({
                                                            $or: [

                                                                {
                                                                    $and: [{sender: `${req.query.part}`},
                                                                        {receiver: `${req.query.me}`}]
                                                                },
                                                                {
                                                                    $and: [{sender: `${req.query.me}`},
                                                                        {receiver: `${req.query.part}`}]
                                                                },


                                                            ]
                                                        })

        //  .sort({_id:-1})

        const chatArr = await chats.toArray()



        await res.status(200).json({data: chatArr});
    } catch {
        res.status(404).json({message: "error"});
    } finally {
        await client.close();
    }

    // 성공시 response
}
