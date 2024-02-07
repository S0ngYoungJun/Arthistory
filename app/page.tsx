"use client"
import React  from 'react';
import Timeline from '@/component/timeline/timeline';

const App = () => {
  
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-screen h-1/6"><Timeline></Timeline></div>
        <div className="w-screen h-5/6 flex justify-center items-center text-7xl">
          THE STORY OF ART, Europe
        </div>
      </div>
  )
};

export default App;