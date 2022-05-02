import React from 'react';
import Header from './Header';
import './App.css';
import Profile from './Profile';
import Feeds from './Feeds';
import News from './News';


function App() {
  return (
    <div className="App flex flex-col">
      {/* Header */}
      <Header></Header>
      {/* App body */}
      <div className="flex flex-row w-8/12 m-auto">
        <Profile/>
        <Feeds/>
        <News/>
      </div>
        {/* profile */}
        {/* feeds */}
        {/* news */}
    </div>
  );
}

export default App;
