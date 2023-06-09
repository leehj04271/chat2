import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import Modal from "@/components/modal";
import PostItem from "@/components/PostItem";
import classes from "./chats.module.css";
function Users() {
    const [users, setUsers] = useState([]);
    const [modal, toggleModal] = useState(false);
    const [receiver, setReceiver] = useState("");

    const {data: session, status} = useSession();

    console.log(session);
    useEffect(() => {
        if (session) {
            fetch(`/api/getChats?me=${session.user.email}`)
                .then((res) => res.json())
                .then(({allChats}) => {
                    setUsers(allChats);
                });
        }

    }, [session]);

    const onClickHandler = (participants) => {
        //toggleModal((modal) => !modal);

        const theOther = participants.filter(participant => participant !== session.user.email)[0]
        setReceiver(theOther)
        toggleModal(true)

    };

    return (
        <div>

            {users.length &&
                users.map((item) => (
                    <div className={classes.chatItem} onClick={() => onClickHandler(item.participants)} key={item.participants}>
                        {item.participants.filter(participant => participant !== session.user.email)[0]}
                    </div>
                ))}


            {modal && session && <Modal reciever={receiver} sender={session.user.email}></Modal>}
        </div>
    );
}

export default Users;
