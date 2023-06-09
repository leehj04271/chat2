import {useEffect, useRef, useState} from "react";
import Message from "@/components/message";
import classes from "./modal.module.css";

export default function (props) {

    const [evtStream, setEventStream] = useState([]);
    const inputRef = useRef()


    console.log(evtStream)
    useEffect(() => {


        fetch(`/api/getMessage/?part=${props.reciever}&me=${props.sender}`).then((res) => {
            console.log(res)
            return res.json()
        }).then(data => setEventStream(data.data))


        const eventSource = new EventSource(`/api/listenToMessage/?part=${props.reciever}&me=${props.sender}`);
        eventSource.onmessage = (event) => {

            const data = JSON.parse(event.data)

            setEventStream(prev => [...prev, data]);


        };
        return () => {
            eventSource.close();
            setEventStream([])


        };
    }, [props.reciever]);

    const sendMessage = async () => {


        await fetch('/api/sendMessage', {
            method: 'POST',
            body: JSON.stringify({sender: props.sender, receiver: props.reciever, message: inputRef.current.value}),
            headers: {
                'Content-Type': 'application/json',
            },
        });


    };


    return (
        <div className={classes.modal}>

            <div>{evtStream.map(msg => <Message key={msg._id} message={msg.message}
                                                myMessage={msg.sender === props.sender}></Message>)}</div>
            <div className={classes.input}>
                <input ref={inputRef}></input>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    );
}
