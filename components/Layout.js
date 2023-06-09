import LOGIN from "@/components/login-btn";
import classes from "./layout.module.css";
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function Layout({children}) {
    const {data: session} = useSession()

    return (<>
            <header className={classes.header}>
                {session &&      <>  <Link href='posts'> posts</Link> <Link href='chats'>messages</Link>

                </> }

                <LOGIN className={classes.btns}></LOGIN></header>
            {children}
        </>
    )
}