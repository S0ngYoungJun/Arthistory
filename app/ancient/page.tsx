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
      box1: '/image/꽃을따는플로라.jpg',
      box2: '폼페이의 부유한 사람들이 집안을 벽화나 모자이크화로 장식해서 생활의 여유를 과시했는데, 이 그림은 그중 하나다.이 그림에서 특이한 점은 뒷모습을 그렸다는 것이다. 정면의 모습을 모든 동작에서 중심으로 삼았던 고대 시대 그림의 관습에서 벗어났음을 알려 준다. 화가들이 다양한 자세와 모습에 서서히 눈을 뜨면서 그림이 좀 더 풍성해졌다. 부드럽고 쾌활한 느낌을 주기 위해서 곡선 흐름을 강조했고, 파스텔톤의 색을 사용해서 주변의 봄기운도 느끼게 했다. ',
      box3: 'Box 3 내용',
      box4: 'path/to/image2.jpg'
    }
  },
    { coordinate: { x: 740, y: 495 }, modalContent: {
      box1: '/image/원반을 던지는사람.jpg',
      box2: '《원반 던지는 사람》(Discobolus, 그리스어: Δισκοβόλος, 디스코볼루스)은 고대 그리스의 조각가 미론이 제작한 청동상이다. 제작연대는 기원전 460년~450년으로 추정된다. 미론이 제작한 원본은 소실되었지만, 그 작품을 그대로 본딴 고대 로마의 복제품들이 여럿 전해지고 있으며, 그 집에서 원본보다 축소된 청동상과 1791년에 발굴된 대리석 조각상이 가장 유명하다. ',
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