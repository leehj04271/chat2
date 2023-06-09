
import classes from "./message.module.css";
export  default  function Message(props){

    return <div className={props.myMessage ? classes.sent : classes.received}>
       <p> <span>{props.message}</span></p>
    </div>
}