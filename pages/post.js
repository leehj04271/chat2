import {useSession} from "next-auth/react";
import PostForm from "@/components/postForm";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function post() {
    const {data: session, status} = useSession();
    const [profile, setProfile] = useState()
    const router = useRouter()
    useEffect(()=>{
        if(!session){
            router.replace('/')
        }
    },[session])

    return (
        <div>


            <PostForm />

        </div>
    )
}