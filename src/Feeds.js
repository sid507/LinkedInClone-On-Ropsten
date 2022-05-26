import { rgbToHex } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { BusinessCenter, Comment, CommentOutlined, Done, Edit, NewReleases, Notifications, NotificationsOutlined, Photo, Send, Share, ThumbUp, ThumbUpOutlined, VideoCall } from '@material-ui/icons'
import { Avatar } from '@mui/material';
import {React,useState,useEffect,forwardRef} from 'react'
import './App.css';
import { db } from './Firebase';
import firebase from 'firebase/compat/app';
import { useDispatch,useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import {ethers} from 'ethers';


// import {db,auth} from './firebase';

// NewReleases
import FlipMove from 'react-flip-move';


function InputOption({Icon,title,color,operation})
{
    return (
        <div onClick={operation} className="flex flex-row gap-2 hover:bg-gray-300 px-1 py-2 rounded-lg cursor-pointer">
            <Icon style={{color:color}}></Icon>
            <div className="normalTextBold">{title}</div>

        </div>
    );
}

const PastFeed=forwardRef(({id,name,desc,msg,photoUrl,blockHash,like},ref)=>{
    var link="https://ropsten.etherscan.io/tx/"+blockHash;
    const [totalLike, settotalLike] = useState(0);
    const [liked, setliked] = useState(false);

    const user = useSelector(selectUser);

    useEffect(() => {
        var ref=db.collection("posts").doc(id);
        ref.get()
        .then(data=>{settotalLike(data.data().like.length)
        for(var i=0;i<data.data().like.length;i++)
        {
            if(data.data().like[i]===user.email)
            {
                setliked(true);
                break;
            }
        }
        
        });
    }, [])
    function addLike(e,userId)
    {
        var ref=db.collection("posts").doc(id);
        ref.update({like:firebase.firestore.FieldValue.arrayUnion(user.email)})
        .then(()=>{
            setliked(true);
            settotalLike(totalLike+1);
        })
    }
    function dislike()
    {
        var ref = db.collection("posts").doc(id);
        ref.update({like:firebase.firestore.FieldValue.arrayRemove(user.email)})
        .then(()=>{
            setliked(false);
        settotalLike(totalLike-1);
        })
    }

    return (
        <div ref={ref} className="flex flex-col bg-white rounded-lg p-4 gap-4 mb-8">
        <div className="flex flex-row gap-2 p-2">
            <Avatar src={photoUrl}></Avatar>
            <div className="flex flex-col ">
                <div className="normalTextBold text-black">{name}</div>
                <div className="normalText text-sm">{desc}</div>
            </div> 
        </div>
        <div>{msg}</div>
        <a href={link}>
        <div on className="hover:cursor-pointer text-blue-400 normalTextBold text-sm">{blockHash}</div>
        </a>
        <hr/>
        <div className="flex flex-row justify-evenly">
            {!liked?<InputOption  operation={(e)=>addLike(e,like)} Icon={ThumbUpOutlined} title={totalLike+" Like"}/>:<InputOption color={"blue"} operation={(e)=>dislike()} Icon={ThumbUpOutlined} title={totalLike+" Like"}/>}
            <InputOption Icon={CommentOutlined} title={"Comment"}/>
            <InputOption Icon={Share} title={"Share"}/>
            <InputOption Icon={Send} title={"Send"}/>
        </div>
     </div>

    );
}
)

Math.randomInt = function(max) {
    return Math.floor(max * Math.random());
};

function Feeds() {

    const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "displayName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "postMessage",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "createPost",
        "outputs": [
            {
                "internalType": "bool",
                "name": "res",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "curr",
                "type": "uint256"
            }
        ],
        "name": "getAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "curr_user",
                "type": "address"
            }
        ],
        "name": "getMessageCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "curr",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "curr_user",
                "type": "address"
            }
        ],
        "name": "getPost",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "profileUrl",
                        "type": "string"
                    }
                ],
                "internalType": "struct Auction.Post",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalUser",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "messageCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "posts",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "profileUrl",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "user",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

    const [post, setpost] = useState([]);
    const [account, setaccount] = useState("");
    const [input, setinput] = useState("");

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const AuctionContractAdress ="0x9905D18fa7B256Fb1e99447e130668514ECEec21";
    var ppost=[];


    async function initializeProvider(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(AuctionContractAdress,abi,signer);
    }

    async function requestAccount() {
        const account = await window.ethereum.request({method:'eth_requestAccounts'});
        setaccount(account[0]);
        console.log(account);
    }
    var unique=0;
    var previousPost=[];
    async function getAllPost(e){
        if (typeof window.ethereum !== 'undefined') {

        await requestAccount();
        const contract = await initializeProvider();
        try{
        
        contract.getTotalUser()
        .then((userCount)=>{
            for(var j=0;j<userCount;j++)
            {   

                contract.getAddress(j)
                .then((address)=>{
                    
                contract.getMessageCount(address)
                .then((count)=>{
                    alert(address,count);
                for(var i=0;i<count;i++)
                {
                    contract.getPost(i,address)
                    .then((postt)=>{
                        console.log(post)
                        var x=post;
                        x.push({id:unique++,data:{name:postt[0],description:account,message:postt[1],photoUrl:postt[3]}});
                        setpost(x);
                        console.log(post)
                    })

                    
                }
            // 
            
                })
         

         
                })
                
            }
        })
        .then(()=>{
            console.log(previousPost);
        })
         
           
        }
        catch (e)
        {
            console.log(e);
        }
    }
    }

    useEffect(() => {
        

        // getAllPost();

        // setpost(previousPost)

        // alert(post[0].name);
        db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>(
            setpost(snapshot.docs.map(doc=>(
                {id:doc.id,
                data:doc.data()}
            )))
        ))
    },[])

    

    async function sendPost(e){
        e.preventDefault();

        await requestAccount();
        console.log(account);
        const contract = await initializeProvider();
        try{

        contract.createPost(user.displayName,input,user.photoUrl)
        .then((data)=>{
            console.log(data);
            db.collection("posts").add(
            {
                name:user.displayName,
                description:user.email,
                message:input,
                photoUrl:user.photoUrl,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                blockHash:data.hash,
                like:[],
                comment:{}
            }
        )
        })


         
           
        }
        catch (e)
        {
            console.log(e.message);
        }

        
        setinput("");
    }

    return (
        <div className="flex flex-col gap-4 lg:basis-3/5 ">
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
            <FlipMove> 
            {post.map(data=><PastFeed key={data.id} id={data.id} blockHash={data.data.blockHash} name={data.data.name} desc={data.data.description} msg={data.data.message} photoUrl={data.data.photoUrl} like={data.data.like}/>)}
            {/* <PastFeed name={"Anuj Sharma"} desc={"Software Engineer"} msg={"Namaste Javascript is responsible for a ton of resignations. 😂"} photoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdeKrw1icXOp_na4WIDMHCstMLWQEKxWqDmIUdUtfu&s"/> */}
            {/* past input */}
            </FlipMove>
        </div>
    )
}

export default Feeds
