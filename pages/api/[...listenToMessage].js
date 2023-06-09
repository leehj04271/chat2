import {MongoClient} from "mongodb";

export default async function handler(req, res) {


    const url =
        "mongodb+srv://testDb:1234@cluster0.zcag5mi.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    // MongoDB 연결

    const sogae = client.db("sogae");

    let changeStream;

    async function run() {
        try {
            const messages = sogae.collection("messages");
            // Open a Change Stream on the "haikus" collection


            const pipeline = [
                {$match: {'fullDocument.receiver': `${req.query.me}`}}
            ];
            const pipeline2 = [{
                $match: {
                    $or: [{
                        $and: [{'fullDocument.receiver': `${req.query.part}`},
                            {'fullDocument.sender': `${req.query.me}`}]
                    }, {
                        $and: [{'fullDocument.receiver': `${req.query.me}`},
                            {'fullDocument.sender': `${req.query.part}`}]
                    },]
                }
            }]
            changeStream = messages.watch(pipeline2);


            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            });
            // Print change events
            for await (const change of changeStream) {
                console.log("Received change:\n", change);

                const message = JSON.stringify(change.fullDocument)

                // res.write(`data: ${text}}\n\n`);
                res.write('data: ' + message + '\n\n');

            }
            await changeStream.close();
        } finally {
            client.close();
        }

        client.close();
    }

    run().catch(console.dir);
    // 성공시 response
}

//https://stackoverflow.com/questions/49153312/mongodb-change-stream-display-only-selected-fields