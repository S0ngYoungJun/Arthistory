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
      box1: '/image/수태고지.jpg',
      box2: '위 그림은 시에나 대성당 안에 있는 성 안사노 예배당의 제단화로 그려졌다. 시모네 마르티니는 매제인 리포 멤미와 공동으로 이 그림을 그렸는데, 멤미가 측면에 서 있는 시에나의 수호성인 성 안사노와 성 줄리타를 담당했다. 중앙 패널에 그려진 천사장 가브리엘과 성모 마리아는 이 세 폭 제단화의 고딕적인 특성을 강화시킨다.다양한 디테일에는 상징적인 의미가 담겨있는데, 백합꽃병은 마리아의 순결을, 올리브 나무 가지는 하나님의 평화로운 전갈을, 두 인물 사이에서 비둘기를 둘러싼 아기천사로 이루어진 장식은 성령의 임재를 암시한다. 천사의 입에서 나오는 “아베 그라티아 블레나 도미누스 테쿰(평안하여라. 은총을 가득 받은 이여. 주께서 너와 함께 계신다).”라는 말이 금박 부조로 표현되었다. 성모 마리아는 틀에 박힌 종교적 도상에서 탈피하여 두려움으로 움츠리고 있는 모습으로 묘사되었다.',
      box3: 'Box 3 내용',
      box4: 'path/to/image2.jpg'
    }
  },
    { coordinate: { x: 960, y: 425 }, modalContent: {
      box1: '/image/옥좌의그리스도.jpg',
      box2: 'Box 2 내용',
      box3: '그리스도의 세례(The Baptism of Christ)는 이탈리아 르네상스 화가인 안드레아 델 베로키오가 1475년 완성한 작품이다. 현재 이탈리아 피렌체의 우피치 미술관에 소장되어 있다.이 작품에서는 마태오 복음, 마르코 복음, 루가 복음 등에 기록되어 있는 예수가 세례자 요한에게 세례를 받고 있는 모습을 묘사하고 있다. 왼편의 천사 부분은 당시 베로키오의 제자였던 레오나르도 다 빈치가 그려 넣었던 것으로 알려져 있다. 이 같은 사실 때문에 정작 베로키오의 작품이면서도 그림 전반의 가치와 중요성은 주목받지 못하는 경우가 많다. 최근에 와서는 배경 속 풍광과 예수 그리스도도 다빈치가 그린 것으로 보는 시각도 있다.',
      box4: '/image/그리스도의세례.jpg'
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
  )
};

export default App;