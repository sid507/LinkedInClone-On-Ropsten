import { rgbToHex } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { BusinessCenter, Comment, CommentOutlined, Done, Edit, NewReleases, Notifications, NotificationsOutlined, Photo, Send, Share, ThumbUp, ThumbUpOutlined, VideoCall } from '@material-ui/icons'
import { Avatar } from '@mui/material';
import {React,useState,useEffect} from 'react'
import './App.css';
import { db } from './Firebase';
import firebase from 'firebase/compat/app';

// import {db,auth} from './firebase';

// NewReleases


function InputOption({Icon,title,color})
{
    return (
        <div className="flex flex-row gap-2 hover:bg-gray-300 px-1 py-2 rounded-lg">
            <Icon style={{color:color}}></Icon>
            <div className="normalTextBold">{title}</div>

        </div>
    );
}

function PastFeed({name,desc,msg,photoUrl})
{
    return (
        <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
        <div className="flex flex-row gap-2 p-2">
            <Avatar src={photoUrl}></Avatar>
            <div className="flex flex-col ">
                <div className="normalTextBold text-black">{name}</div>
                <div className="normalText text-sm">{desc}</div>
            </div> 
        </div>
        <div>{msg}</div>
        <hr/>
        <div className="flex flex-row justify-evenly">
            <InputOption Icon={ThumbUpOutlined} title={"Like"}/>
            <InputOption Icon={CommentOutlined} title={"Comment"}/>
            <InputOption Icon={Share} title={"Share"}/>
            <InputOption Icon={Send} title={"Send"}/>
        </div>
     </div>

    );
}

function Feeds() {

    const [post, setpost] = useState([]);
    const [input, setinput] = useState("");
    useEffect(() => {
        
        db.collection("posts").onSnapshot(snapshot=>(
            setpost(snapshot.docs.map(doc=>(
                {id:doc.id,
                data:doc.data()}
            )))
        ))
    }, [])

    const sendPost=(e)=>{
        e.preventDefault();
        db.collection("posts").add(
            {
                name:"Siddharth Mishra",
                description:"Software Developer",
                message:input,
                photoUrl:"",
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            }
        )
    }

    return (
        <div className="flex flex-col gap-4 basis-3/5">
            {/* post input */}
            <div className="flex flex-col h-32 w-full bg-white p-4 rounded-lg space-y-2">
                <form className="flex flex-row  py-2 px-4 rounded-full border-2 border-gray-400 ">
                    {/* <> */}
                    <Edit className="text-gray-500 my-auto"></Edit>
                    <button onClick={sendPost}></button>
                    <input className="w-full p-2 outline-none" onChange={e => setinput(e.target.value)}></input>
                    {/* </form> */}
                </form>
                <div className="flex flex-row justify-around">
                    <InputOption Icon={Photo} title={"Photo"} color={"#70b5f9"}></InputOption>
                    <InputOption Icon={VideoCall} title={"Video"} color={"#7fc15e"}></InputOption>
                    <InputOption Icon={BusinessCenter} title={"Jobs"} color={"#a8d4ff"}></InputOption>
                    <InputOption Icon={NewReleases} title={"Article"} color={"#fc9295"}></InputOption>

                </div>

            </div>
            <hr/>

            {post.map(data=><PastFeed key={data.id} name={data.data.name} desc={data.data.description} msg={data.data.message} photoUrl={data.data.photoUrl}/>)}
            {/* <PastFeed name={"Anuj Sharma"} desc={"Software Engineer"} msg={"Namaste Javascript is responsible for a ton of resignations. 😂"} photoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdeKrw1icXOp_na4WIDMHCstMLWQEKxWqDmIUdUtfu&s"/> */}
            {/* past input */}
        </div>
    )
}

export default Feeds
