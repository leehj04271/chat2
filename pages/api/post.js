import {MongoClient} from "mongodb";

export default async function handler(req, res) {
    const url =
        "mongodb+srv://testDb:1234@cluster0.zcag5mi.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    // MongoDB 연결

    const sogae = client.db("sogae");

    // 기존의 가입된 이메일 체크하기



    const data = req.body;

    const { title, content , position, email} = data;


    try {
        await sogae.collection('users').updateOne(
            { email: email },
            {
                $set: { profile : {title, content, position}},
                $currentDate: { lastModified: true }
            }
        );
        const existingUser = await sogae.collection('posts').findOne({
                                                               email: email
                                                           });
        if(existingUser){
            await sogae.collection("posts").updateOne({ email: email },{   $set: { title : title, content:content, position  :position}})

        } else {
            await sogae.collection("posts").insertOne({title, content , position, email})

        }

        res.status(200).send('hi')

    } catch {
        res.status(404).json({ message: "error" });
    }
    await client.close();



    // 성공시 response
}
