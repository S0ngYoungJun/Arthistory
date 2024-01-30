

import React from 'react';
import Spaceship3 from '@/component/spaceship2 copy';
import backgroundImage from "@/public/image/지도2.jpg";
import Timeline from '@/component/timeline/timeline';
import styles from '@/component/spaceship2.module.scss'
interface Coordinate {
  x: number;
  y: number;
}
interface ModalContent {
  box1: string;
  box2: string;
  box3: string;
  box4: string;
}

interface MarkerData {
  coordinate: Coordinate;
  modalContent: ModalContent;
}

const App = () => {
  const initialPosition: MarkerData[] = [
    { coordinate: { x: 10, y: 10 },  modalContent: {
      box1: 'paaer용',
      box2: 'wfeff',
      box3: 'Box 3 내용',
      box4: 'paterg2.jpg'
    }
  },
    { coordinate: { x: 550, y: 290 }, modalContent: {
      box1: '허우허우',
      box2: 'Box 2 내용',
      box3: 'Box 3 내용',
      box4: 'path/to/image2.jpg'
    }
  },
    { coordinate: { x: 650, y: 455 }, modalContent: {
      box1: 'paegaegg',
      box2: 'Box 2 내용',
      box3: 'Box 3 내용',
      box4: '겋저덕허'
    }
  },
    // 다른 좌표 데이터 추가
  ];

  
  return (
    <div style={{  width: '100vw', height: '100vh', display:'flex', flexDirection:'column' }}>
      <div style={{  width: '100vw', height: '15vh'}}><Timeline></Timeline></div>
      <div style={{  width: '100vw', height: '85vh', position: 'relative' ,
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundPosition:"center",
        backgroundSize:'contain',
        objectFit:"fill",
        backgroundRepeat: "no-repeat",}}>
      <Spaceship3 initialPosition={initialPosition} />
      </div>
    </div>
  );
};

export default App;