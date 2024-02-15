"use client"
import React ,{ useEffect, useState , useRef} from 'react';
import Spaceship3 from '@/component/spaceship';
import Timeline from '@/component/timeline/timeline';
import Image from 'next/image';
import styles from '@/app/styles/main.module.scss'

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
  const [selectedText, setSelectedText] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  const buttonsInfo = [
    { id: 1, text: '포스트 모더니즘', info: '모더니즘의 안티테제. 형식주의를 통한 미술의 통시적 영속성 구축을 추구하였으나 오히려 형식적 세련미에만 초점을 맞추고 역사적, 사회적 흐름으로부터 고립되어가는 모더니즘에 대한 논리적 공격이자 형식주의의 비판을 통틀어 포스트모더니즘 사조라 한다. 포스트모더니즘이 언제부터 언제까지냐에 대해서는 명확히 끊어 정의하기 어려운데, 이는 포스트모더니즘만의 특징이 아닌 예술사조 전반에서 똑같이 드러나는 특징이다. 프로이트의 개념에서 착안한 지연된 작용(Deferred action) 이론이 그것인데, 한 시대사조는 당대에 정의되는 것이 아니라, 예상된 미래와 재구성된 과거를 기초로 미래로부터 정의되는 것이기 때문에 포스트모더니즘 사조를 완전히 벗지 않은 현대에는 그 정확한 시대구분이 무리라는 것.' },
    { id: 2, text: '비디오아트', info: '말 그대로 비디오 영상기기인 텔레비전, 컴퓨터 등을 사용하는 예술. 미디어 아트의 한 종류에 해당한다.주로 여러 개의 텔레비전을 엮어서 만든 작품들을 생각하는데 컴퓨터를 이용해 비디오 게임 형식의 비디오 아트들도 존재한다. 게임 형식의 작품들은 TV와 다르게 조작 가능한 컴퓨터와 게임기와 같이 전시되기도 한다.최근에는 컴퓨터의 등장으로 멀티미디어 콘텐츠 생산이 쉬워지고, 텔레비전 브라운관이 다 LCD 같은 디지털매체로 전환되는 추세라서, 비디오아트라는 개념보다는 미디어아트라는 개념을 더 많이 사용하고 있다.' },
    { id: 3, text: '행위예술', info: '행위예술(行爲藝術). 영어로는 Performance. 이런 예술을 하는 사람들은 행위예술가, 혹은 Performance Artist라고 한다. 모더니즘 회화의 경직성에 반대해 예술가의 신체를 전면에 드러낸 예술이다. 술가들은 추상표현주의의 "행위"에 초점을 맞춰서, 아예 "행위 그 자체" 만으로도 예술이 되지 않겠냐는 생각을 하였다. 또한 회화가 평면에만 있어야 된다는 고정관념에서 벗어나서 자기 몸에다 물감을 칠하여 작품을 만들기도 하고, 움직이는 신체(무용의 요소)를 그대로 관객에게 보여주는 등의 시도를 하기 시작하면서 부터, 기존 2차원의 평면 회화에서 점점 멀어지기 시작하였다. 이를 그 당시에는 "해프닝"이라고 하였는데, 이들의 급진적인 시도는 후대의 플럭서스 같은 다른 사조에도 영향을 끼쳐서 백남준 등도 넓게 보면 이 영향권 안에 있는 예술가이라 할 수 있다.' },
   
  ];

  const handleButtonClick = (info : any) => {
    setSelectedText(info); // 클릭된 버튼에 할당된 텍스트로 상태 업데이트
    setAnimationKey(prevKey => prevKey + 1); 
  };
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
    <div className={styles.main}>
      <div className={styles.top}><Timeline></Timeline></div>
      <div className={styles.flow}>
        {buttonsInfo.map((button) => (
            <button key={button.id} className={styles.button} onClick={() => handleButtonClick(button.info)}>
              {button.text}
            </button>
          ))}
      </div>
      <div 
      ref={europeRef}
      className="europe"
      style={{  width: '55vw', height: '85vh',position:"relative"}}>
      <Image fill={true} src={`/image/지도2.jpg`} alt={'일단소개'} />
      <Spaceship3 initialPosition={initialPosition} parentDimensions={parentDimensions}/>
      </div>
      <div className={styles.info}>
        <div key={animationKey} className={styles.scrollAnimation}>
            {selectedText}
        </div>
      </div>
    </div>
  );
};

export default App;