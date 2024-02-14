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
    { id: 1, text: '크레타', info: '버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.' },
    { id: 2, text: '그리스', info: '버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.' },
    { id: 3, text: '로마', info: '버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.' },
   
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
    { coordinate: { x: 400, y: 800 }, modalContent: {
      box1: '/image/꽃을따는플로라.jpg',
      box2: '폼페이의 부유한 사람들이 집안을 벽화나 모자이크화로 장식해서 생활의 여유를 과시했는데, 이 그림은 그중 하나다.이 그림에서 특이한 점은 뒷모습을 그렸다는 것이다. 정면의 모습을 모든 동작에서 중심으로 삼았던 고대 시대 그림의 관습에서 벗어났음을 알려 준다. 화가들이 다양한 자세와 모습에 서서히 눈을 뜨면서 그림이 좀 더 풍성해졌다. 부드럽고 쾌활한 느낌을 주기 위해서 곡선 흐름을 강조했고, 파스텔톤의 색을 사용해서 주변의 봄기운도 느끼게 했다. ',
      box3: '아우구스투스의 가장 유명한 초상 가운데 하나는 기원전 20년에 만들어진, 소위 프리마포르타의 아우구스투스라고 불리우는 것이다. (이 조각상은 1863년에 이탈리아의 한 마을에서 발견되었으며 이 마을의 이름을 따서 그러한 명칭을 갖게 되었다.), 얼핏 보면 이 조각상은 웅변가이자, 장군으로서의 아우구스투스의 초상화와 비슷해보인다. 그러나 한편으로, 이 조각상에서는 황제로서의 힘과 이데올로기적인 측면을 엿볼 수 있다. 실제로, 아우구스투스는 이 초상화를 통해 스스로를 위대한 승리자이자 로마 종교의 충실한 후원자로서 표현하고자 했다. 이 조각상은 또한 아우구스투스로부터 시작된 200년간의 평화, “팍스 로마나"를 예견하고 있다.',
      box4: '/image/Statue-Augustus.jpg'
    }
  },
    { coordinate: { x: 500, y: 800 }, modalContent: {
      box1: '/image/원반을 던지는사람.jpg',
      box2: '《원반 던지는 사람》(Discobolus, 그리스어: Δισκοβόλος, 디스코볼루스)은 고대 그리스의 조각가 미론이 제작한 청동상이다. 제작연대는 기원전 460년~450년으로 추정된다. 미론이 제작한 원본은 소실되었지만, 그 작품을 그대로 본딴 고대 로마의 복제품들이 여럿 전해지고 있으며, 그 집에서 원본보다 축소된 청동상과 1791년에 발굴된 대리석 조각상이 가장 유명하다. ',
      box3: '사모트라케의 니케(그리스어: Νίκη της Σαμοθράκης)는 고대 그리스의 대표적인 조각상 가운데 하나로, 기원전 220년에서 190년 사이에 제작된 것으로 추정된다.그리스 신화에서 승리를 관장하는 여신인 니케를 묘사한 대리석상으로, 길이는 328cm이며, 머리와 양팔이 잘려진 채로 남아있다. 현재 프랑스 파리시 루브르 박물관에 전시되어 있다.사모트라케의 니케는 기원전 190년 로도스섬의 주민들이 에게해에서 일어난 해전에서 승리한 것을 기념하기 위해 사모트라키섬에 세운 조각상으로 추정된다. 이 조각상은 1863년 프랑스의 영사 겸 고고학자인 샤를 샴푸아소가 발견했으며, 1884년 루브르 박물관에 소장되어 오늘에 이르고 있다.',
      box4: '/image/니케.jpg'
    }
  },
    { coordinate: { x: 520, y: 900 }, modalContent: {
      box1: '/image/황소와곡예.jpg',
      box2: '황소와 곡예는 크레타 미술의 자유로움을 잘 보여 주는 작품 중 하나이다. 황소의 등에서 한 젊은 남자가 곡예를 부리는 장면이다. 황소의 앞과 뒤에서도 각각 상황을 연출하거나 황소를 통제하고 있다. 조각이나 금으로 만든 원반 위에 음각으로도 많이 나타나는 것으로 봐서 당시 크레타인들이 즐겼던 곡예인 것 같다.',
      box3: '그림은 세 명의 여인이 화려하게 치장을 한 모습이다. 머리는 구슬로 보이는 장식물로 한껏 멋을 냈다. 목걸이와 팔찌를 하고 있으며 붉은색과 파란색으로 물들인 옷을 입었다. 대부분 유방을 드러낸 재킷과 풍만한 엉덩이를 강조하는 치마 차림이다. 또한 여인들의 표정이 재미있다. 입꼬리가 올라가 있어서 살짝 웃는 표정이다. 측면 얼굴에 상체나 눈은 정면이어서 이집트 미술과의 연관성이 떠오르지만, 다른 한편으로 엄숙하고 비장한 표정이 지배하는 이집트나 그리스 미술과는 상당히 대조적인 특징을 보인다.여성이 주요 주인공으로 등장하는 것은 매우 특이한 현상이다. 앞서 메소포타미아와 이집트 미술에서 볼 수 있듯이 다른 문명의 벽화에서는 남성 묘사가 압도적이었다. 여성은 양적으로도 적고 대체로 부차적 역할에 머물렀다. 부계제에 기반을 둔 국가 체제 성격이 그대로 미술에 적용되었기 때문이다. 여성이 중심 묘사 대상인 데는 크레타에 깊숙이 남아 있는 모계 의식과 관습을 연결시키는 것이 자연스럽다.',
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