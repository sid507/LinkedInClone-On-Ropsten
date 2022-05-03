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
      <div className="flex flex-row md:w-full lg:w-8/12  m-auto space-x-4 p-5">
        <Profile name="Siddharth Mishra" desc={"App Developer at Kylo Apps"} views={400} connection={550} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdeKrw1icXOp_na4WIDMHCstMLWQEKxWqDmIUdUtfu&s" />
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
