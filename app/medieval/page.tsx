"use client"
import React ,{ useEffect, useState , useRef} from 'react';
import Spaceship3 from '@/component/spaceship2 copy';
import Timeline from '@/component/timeline/timeline';
import Image from 'next/image';


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
  const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });
  const europeRef = useRef<HTMLDivElement>(null); // europe div에 대한 ref

  useEffect(() => {
    const updateSize = () => {
      if (europeRef.current) {
        setParentDimensions({
          width: europeRef.current.offsetWidth,
          height: europeRef.current.offsetHeight,
        });
      }
    };

    // 초기 크기 설정
    updateSize();

    // ResizeObserver를 사용하여 europe div의 크기 변화 감지
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (europeRef.current) {
      resizeObserver.observe(europeRef.current);
    }

    // Cleanup 함수
    return () => {
      if (europeRef.current) {
        resizeObserver.unobserve(europeRef.current);
      }
    };
  }, []);

  const initialPosition: MarkerData[] = [
    { coordinate: { x: 640, y: 450 }, modalContent: {
      box1: '/image/황후와 수행자들.jpg',
      box2: '산비탈레 성당,  ',
      box3: 'Box 3 내용',
      box4: 'path/to/image2.jpg'
    }
  },
    { coordinate: { x: 400, y: 800 }, modalContent: {
      box1: '/image/그리스도의애도(중세,이탈리아).jpg',
      box2: '조토의 대표작 ‘애도’(Lamentation)를 보면 그의 그림이 추상적이고 상징적인 과거의 영상이 아닌 감동적이고 실제적인 삶을 다루고 있음을 느낄 수 있다.인물들이 전면에 등장하고 그들의 동작과 표정, 제스처로 내면의 감정을 표현한다. 황금빛 배경이 사라졌으며 화면을 가로지르는 대각선의 언덕은 관객의 시선을 예수에게로 향하는 구도를 이룬다. 단축법을 사용해 화면 중앙의 두 팔을 펼친 사람의 팔 모양에서 거리감이 느껴지게 하였다. 뒷모습을 보인 채 앉아 있는 인물들은 실제로 예수를 둘러싸고 있는 현장감을 구현한다.엄격하게 정면성과 위계적 차이를 유지하는 비잔틴양식 대신에 관찰자의 시점을 고려해 그림이 한 눈에 들어오게 하는 3차원의 양식을 개발함으로 실제적인 공간감과 입체감이 느껴지게 하였다.',
      box3: '이탈리아 회화의 아버지로 불리는 조반니 치마부에 Giovanni Cimabue의 <십자가의 예수>는 이전 미술과 확연한 차이를 보여 준다. 신의 영광을 묘사하기 위한 도구라는 점에서는 동일하지만 회화적 표현에서 사실 요소가 대폭 강화되었다. <십자가의 예수>는 장엄한 예수가 아닌 고통에 찬 예수의 모습을 그렸다. 과거에는 예수를 의연한 모습으로 표현해 불멸의 이미지를 살리려 했다. 하지만 치마부에의 그림에서 십자가에 매달린 예수는 고통스러워하는 모습 그대로다.무엇보다도 생생한 신체 묘사가 한눈에 들어온다. 머리는 옆으로 기울었고 몸은 활처럼 휘어져 밑으로 축 늘어졌다. 손과 발, 몸의 근육도 나름대로는 사실에 가깝게 다가서려 노력한 흔적이 보인다. 압권은 고통으로 일그러진 표정이다. 고난과 아픔을 당하고 있는 모습을 통해 인간적인 측은함마저 느끼게 된다. 예수의 오른쪽 팔옆에 그려져 있는 성모 그림에서도 표정이 읽힌다. 아직 어색하기는 하지만 미간의 주름, 눈과 입술의 모양을 조절하여 슬픈 감정을 구현했다. 또한 적극적으로 명암법을 사용하여 입체감을 더했다.치마부에의 <십자가의 예수>는 비잔틴 미술의 전통을 계승하면서도 사실적인 표현을 통해 새로운 시대를 열었다. 이 그림은 이탈리아 회화의 발전에 중요한 역할을 했다.',
      box4: '/image/십자가의예수.jpg'
    }
  },
    { coordinate: { x: 740, y: 495 }, modalContent: {
      box1: '/image/황소와 곡예.jpg',
      box2: '황소와 곡예는 크레타 미술의 자유로움을 잘 보여 주는 작품 중 하나이다. 황소의 등에서 한 젊은 남자가 곡예를 부리는 장면이다. 황소의 앞과 뒤에서도 각각 상황을 연출하거나 황소를 통제하고 있다. 조각이나 금으로 만든 원반 위에 음각으로도 많이 나타나는 것으로 봐서 당시 크레타인들이 즐겼던 곡예인 것 같다.',
      box3: '사모트라케의 니케(그리스어: Νίκη της Σαμοθράκης)는 고대 그리스의 대표적인 조각상 가운데 하나로, 기원전 220년에서 190년 사이에 제작된 것으로 추정된다.그리스 신화에서 승리를 관장하는 여신인 니케를 묘사한 대리석상으로, 길이는 328cm이며, 머리와 양팔이 잘려진 채로 남아있다. 현재 프랑스 파리시 루브르 박물관에 전시되어 있다.사모트라케의 니케는 기원전 190년 로도스섬의 주민들이 에게해에서 일어난 해전에서 승리한 것을 기념하기 위해 사모트라키섬에 세운 조각상으로 추정된다. 이 조각상은 1863년 프랑스의 영사 겸 고고학자인 샤를 샴푸아소가 발견했으며, 1884년 루브르 박물관에 소장되어 오늘에 이르고 있다.',
      box4: '/image/세여인.jpg'
    }
},
    // 다른 좌표 데이터 추가
  ];

  
  return (
    <div style={{  width: '100vw', height: '100vh', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{  width: '100vw', height: '15vh'}}><Timeline></Timeline></div>
      <div 
      ref={europeRef}
      className="europe"
      style={{  width: '55vw', height: '85vh',position:"relative"}}>
      <Image fill={true} src={`/image/지도2.jpg`} alt={'일단소개'} />
      <Spaceship3 initialPosition={initialPosition} parentDimensions={parentDimensions}/>
      </div>
    </div>
  );
};

export default App;