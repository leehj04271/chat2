import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import Modal from "@/components/modal";

function Users() {
    const [users, setUsers] = useState([]);
    const [modal, toggleModal] = useState(false);
    const [receiver, setReceiver] = useState("");

    const {data: session, status} = useSession();

    console.log(session);

    useEffect(() => {
        fetch("/api/getUsers")
            .then((res) => res.json())
            .then(({allUsers}) => {
                setUsers(allUsers);
            });
    }, []);

    const onClickHandler = (email) => {
        //toggleModal((modal) => !modal);
        toggleModal(true)
        setReceiver(email);
    };

    return (
        <div>
            Me : {session && session.user.email}
            {users.length &&
                users.map((item) => (
                    <div onClick={() => onClickHandler(item.email)} key={item.email}>
                        {item.email}
                    </div>
                ))}

            {receiver}
            {modal && session && <Modal reciever={receiver} sender={session.user.email}></Modal>}
        </div>
    );
}

export default Users;
