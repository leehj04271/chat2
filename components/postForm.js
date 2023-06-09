import {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import classes from "./postForm.module.css";

export default function PostForm(props) {
    console.log(props)
    const {data: session, status} = useSession();

    const [title1, setTitle] = useState('')
    const [content1, setcontent] = useState('')
    const [position1, setPosition] = useState('')

    useEffect(() => {
        if (!session) return;
        console.log(session.user.profile)
        setTitle(session.user.profile.title)
        setcontent(session.user.profile.content)
        setPosition(session.user.profile.position)

    }, [session])


    const title = useRef()
    const content = useRef()
    const router = useRouter();
    const onSubmitHandler = async (e) => {

        if (!session) {
            return
        }
        e.preventDefault()

        console.log(title.current.value)
        console.log(content.current.value)


        await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                                     title: title.current.value,
                                     content: content.current.value,
                                     position: position1,
                                     email: session.user.email
                                 }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        router.push('/posts')

    }

    return (
        <form onSubmit={onSubmitHandler} className={classes.form}>


            <div className={classes.formControl}>
                <p>title

                </p>
                <input type='text' ref={title} value={title1} onChange={(e) => setTitle(e.target.value)}>
            </input>
            </div>

            <div className={classes.formControl}>
                <p> content</p>
                    <textarea  rows='10' ref={content} value={content1} onChange={(e) => setcontent(e.target.value)}>
            </textarea>
            </div>

            <div className={classes.formControl}>
                helper <input type="radio" name='position' checked={position1 === 'helper'} value='helper'
                              onClick={(e) => setPosition(e.target.value)}/>
                helpee <input type="radio" name='position' checked={position1 === 'helpee'} value='helpee'
                              onClick={(e) => setPosition(e.target.value)}/>
            </div>
            <button>post</button>
        </form>
)
}