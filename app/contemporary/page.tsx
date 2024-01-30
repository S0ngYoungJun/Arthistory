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
    { coordinate: { x: 640, y: 450 }, modalContent: {
      box1: '허우허우',
      box2: 'Box 2 내용',
      box3: 'Box 3 내용',
      box4: 'path/to/image2.jpg'
    }
  },
    { coordinate: { x: 740, y: 495 }, modalContent: {
      box1: '/image/고대그리스동상.jpg',
      box2: 'Box 2 내용',
      box3: '사모트라케의 니케(그리스어: Νίκη της Σαμοθράκης)는 고대 그리스의 대표적인 조각상 가운데 하나로, 기원전 220년에서 190년 사이에 제작된 것으로 추정된다.그리스 신화에서 승리를 관장하는 여신인 니케를 묘사한 대리석상으로, 길이는 328cm이며, 머리와 양팔이 잘려진 채로 남아있다. 현재 프랑스 파리시 루브르 박물관에 전시되어 있다.사모트라케의 니케는 기원전 190년 로도스섬의 주민들이 에게해에서 일어난 해전에서 승리한 것을 기념하기 위해 사모트라키섬에 세운 조각상으로 추정된다. 이 조각상은 1863년 프랑스의 영사 겸 고고학자인 샤를 샴푸아소가 발견했으며, 1884년 루브르 박물관에 소장되어 오늘에 이르고 있다.',
      box4: '/image/니케.jpg'
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