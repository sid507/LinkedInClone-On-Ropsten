import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { logIn, logout, selectUser } from './features/userSlice';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';

function Login() {

    const [name, setname] = useState("");
    const [profilePic, setprofilePic] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const user2 = useSelector(selectUser);
    const [loading, setloading] = useState(false);


    const signIn = (e) => {
        e.preventDefault();
        setloading(true);
        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                dispatch(logIn({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoUrl: userAuth.user.photoURL,
                }))
            })
            .then(() => {
                console.log(user2);
                setloading(false);
            })
            .catch(e => {console.log(e); setloading(false)})
           
            // alert(loading);
    }

    const register = (e) => {
        setloading(true);
        if (!name) {
            return alert("Enter the full name!");
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
            
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profilePic,
                })
                    .then(() => {
                        dispatch(logIn({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                            profileUrl: profilePic,
                        }))

                    })

            })
            .catch((error) => alert(error.message));
            // setloading(false);
    }
    return (
        <div className="flex flex-col w-3/12 mx-auto my-20 gap-y-3  ">
            <img className="mx-auto" width="100px" src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img>

            {loading ? <ReactLoading className="mx-auto my-10" color={"black"} type={"bars"}></ReactLoading> : (
                <form className="flex flex-col gap-y-2">
                    <input onChange={e => setname(e.target.value)} className="py-3 px-2 rounded-lg border-2 border-gray-400 outline-none" placeholder="Full Name (required if registering)"></input>
                    <input onChange={e => setprofilePic(e.target.value)} className="py-3 px-2 rounded-lg border-2 border-gray-400 outline-none" placeholder="Profile pic URL (optional)"></input>
                    <input onChange={e => setemail(e.target.value)} className="py-3 px-2 rounded-lg border-2 border-gray-400 outline-none" placeholder="Email"></input>
                    <input onChange={e => setpassword(e.target.value)} className="py-3 px-2 rounded-lg border-2 border-gray-400 outline-none" placeholder="Password"></input>
                    <button onClick={signIn} className="py-3 px-2 rounded-lg border-2 bg-blue-400 outline-none">Sign In</button>
                    <div className="flex flex-row mx-auto gap-2">
                        <div className="normalText">Not a member?</div>
                        <div onClick={register} className="normalTextBlue hover:cursor-pointer">Register Now</div>
                    </div>
                </form>
            )}

        </div>
    )
}

export default Login
