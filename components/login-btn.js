import {useSession, signIn, signOut} from "next-auth/react"
import classes from "./login-btn.module.css";
import Link from "next/link";
export default function LOGIN() {
    const {data: session} = useSession()

    if (session) {
        return (
            <div style={{textAlign:"right"}}>
              <Link href='/post'> {session.user.email}</Link>
                <button className={classes.btn} onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div style={{textAlign:"right", flexGrow : 1}}>
            <button className={classes.btn} onClick={() => signIn()}>Sign in</button>
        </div>
    )
}