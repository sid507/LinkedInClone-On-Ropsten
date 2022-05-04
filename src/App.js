import {React,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import './App.css';
import Profile from './Profile';
import Feeds from './Feeds';
import News from './News';
import { logIn, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './Firebase';


function App() {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        dispatch(logIn({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      }
      else
      {
        dispatch(logout());
      }
    })

  }, [])

  return (
    <div className="App flex flex-col">
      {/* Header */}
      <Header></Header>
      {user ? (<div className="flex lg:flex-row sm:flex-col md:w-full lg:w-8/12  m-auto space-x-4 p-5 my-12 ">
        <Profile name={user.displayName} desc={user.email} views={400} connection={550} avatar={user.photoUrl} />
        <Feeds />
        <News />
      </div>) : <Login />}


    </div>
  );
}

export default App;
