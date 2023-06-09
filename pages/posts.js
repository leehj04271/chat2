import {useSession} from "next-auth/react";
import PostForm from "@/components/postForm";
import {useEffect, useState} from "react";
import Link from "next/link";
import Modal from "@/components/modal";

export default function posts() {
    const {data: session, status} = useSession();
    const [posts, setPosts] = useState()
    const [position, setPosition]  = useState('helper')

    useEffect(() => {
        fetch(`/api/getPosts?position=${position}`)
            .then((res) => res.json())
            .then(data => {
                setPosts(data.allPosts);
            });


    }, [position]);

    const [modal, toggleModal] = useState(false);
    const [receiver, setReceiver] = useState("");
    const onClickHandler = (email) => {
        //toggleModal((modal) => !modal);
        toggleModal(true)
        setReceiver(email);
        console.log(receiver)
    };

    return (
        <div>
            <button onClick={()=>setPosition('helpee')}> helpee</button>

            <button onClick={()=>setPosition('helper')}> helper </button>
            {receiver}
            {posts && posts.map(post=><div key={post._id}>
                <div>
                    {post.title}
                </div>
                <div>
                    {post.content}
                </div>
                <div>
                    {post.position}
                </div>
                <button onClick={()=>onClickHandler(post.email)}>contact</button>
           </div>)}


            {modal && session   &&<Modal reciever={receiver} sender={session.user.email}></Modal>}

        </div>
    )
}