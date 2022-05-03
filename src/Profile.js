import { Avatar } from '@mui/material'
import React from 'react'
import './App.css';

function Profile({avatar,name,desc,views,connection}) {

    var tags=[
        "#reactJs","#linkedIn","#twitter","#ML"
    ];

    return (
        <div className="flex basis-1/5  flex-col justify-items-center   space-y-5">
        <div className="flex flex-col h-72 bg-white rounded-xl">
        <img className="h-20 rounded-t-md" src="https://media.istockphoto.com/photos/golden-blur-picture-id486783616?k=20&m=486783616&s=612x612&w=0&h=HzG_ZdNkPao_M7oZzeZ5Bc0WIzC1t31muVA8F7axorU="></img>
        <div className="-my-5 space-y-5 mx-2">
            
            <div className="mx-auto justify-center">
            <Avatar className="mx-auto" src={avatar} ></Avatar>
            <h3 className="text-center">{name}</h3>
            <h2 className="text-center text-sm normalText">{desc}</h2>
            </div>
            <hr/>
            <div className="flex flex-row justify-between text-sm ">
            <h4 className="normalText">Who viewed your profile </h4> 
            <h4 className="normalTextBlue">{views}</h4>
            </div>
            <div className="flex flex-row justify-between text-sm">
            <h4 className="normalText">Connections </h4> 
            <h4 className="normalTextBlue">{connection}</h4>
            </div>
        </div>
        </div>
        <div className="flex flex-col bg-white rounded-xl p-2">
            
            <div className="normalText text-sm">Recent</div>
            {tags.map((data)=>{
               return <div className="normalTextBold text-sm hover:bg-gray-200 my-1 p-1">{data}</div>
            })}
        </div>
        </div>
    )
}

export default Profile
