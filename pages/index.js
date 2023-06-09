
import LOGIN from "../components/login-btn";
import {useSession} from "next-auth/react";
import Link from "next/link";

function HomePage() {
    const {data: session, status} = useSession();

    console.log(session)

    return (
        <div>


            {session && <Link href='/post'>post</Link>}

        </div>
    );
}

export default HomePage;
