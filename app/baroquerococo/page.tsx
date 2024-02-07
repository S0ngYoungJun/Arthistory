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
      box1: '/image/고대로마의베루타.jpg',
      box2: '조반니 파올로 판니니는 로마에서 극장 무대 배경을 그리는 화가로 활동했다. 그러다 로마의 고대 유적에 관심을 갖고, 폐허가 된 옛 로마의 풍경을 낭만적으로 그리면서 명성을 얻게 된다. 그는 건축물 등 실제의 풍경에 화가의 상상을 곁드일 카프리치오양식에 능통했다. <고대 로마 풍경이 있는 화랑>은 말 그대로 고대 로마의 유적을 배경으로 한 어느 화랑의 모습을 담고 있다. 상상이 가미된 것이니만큼 실제와 똑같지는 않겠지만 18세기의 화랑 풍경이 어떠했는지, 그 분위기를 대충 가늠할 수 있다. 그는 로마의 건축물에서 흔히 발견되는 아치와 줄 이은 기둥들을 화랑의 내외부에 적절히 그려 놓았다. 무엇보다 그의 고대 로마에 대한 관심은 그림 속 그림들이다. 콜로세움, 판테온, 그리고 개선문 등은 오늘날의 우리에게도 익숙한 건축물이다. 그림 왼쪽의 헤라클레스 상부터 오른쪽 귀퉁이의 라오콘 상까지, 전시된 조각품 역시 로마의 미술 애호가들이 수집해 놓은 고대 그리스,로마 시절의 것들이다. ',
      box3: 'Box 3 내용',
      box4: '/image/베드로의순교(바로크이탈리아).jpg'
    }
  },
    { coordinate: { x: 740, y: 495 }, modalContent: {
      box1: '/image/사비니 여인의 납치(프랑스,바로크).jpg',
      box2: '《원반 던지는 사람》(Discobolus, 그리스어: Δισκοβόλος, 디스코볼루스)은 고대 그리스의 조각가 미론이 제작한 청동상이다. 제작연대는 기원전 460년~450년으로 추정된다. 미론이 제작한 원본은 소실되었지만, 그 작품을 그대로 본딴 고대 로마의 복제품들이 여럿 전해지고 있으며, 그 집에서 원본보다 축소된 청동상과 1791년에 발굴된 대리석 조각상이 가장 유명하다. ',
      box3: '사모트라케의 니케(그리스어: Νίκη της Σαμοθράκης)는 고대 그리스의 대표적인 조각상 가운데 하나로, 기원전 220년에서 190년 사이에 제작된 것으로 추정된다.그리스 신화에서 승리를 관장하는 여신인 니케를 묘사한 대리석상으로, 길이는 328cm이며, 머리와 양팔이 잘려진 채로 남아있다. 현재 프랑스 파리시 루브르 박물관에 전시되어 있다.사모트라케의 니케는 기원전 190년 로도스섬의 주민들이 에게해에서 일어난 해전에서 승리한 것을 기념하기 위해 사모트라키섬에 세운 조각상으로 추정된다. 이 조각상은 1863년 프랑스의 영사 겸 고고학자인 샤를 샴푸아소가 발견했으며, 1884년 루브르 박물관에 소장되어 오늘에 이르고 있다.',
      box4: '/image/키테라섬으로의_출항(로코코,프랑스).jpg'
    }
  },
    { coordinate: { x: 340, y: 395 }, modalContent: {
      box1: '/image/결혼계약.jpg',
      box2: '황소와 곡예는 크레타 미술의 자유로움을 잘 보여 주는 작품 중 하나이다. 황소의 등에서 한 젊은 남자가 곡예를 부리는 장면이다. 황소의 앞과 뒤에서도 각각 상황을 연출하거나 황소를 통제하고 있다. 조각이나 금으로 만든 원반 위에 음각으로도 많이 나타나는 것으로 봐서 당시 크레타인들이 즐겼던 곡예인 것 같다.',
      box3: '사모트라케의 니케(그리스어: Νίκη της Σαμοθράκης)는 고대 그리스의 대표적인 조각상 가운데 하나로, 기원전 220년에서 190년 사이에 제작된 것으로 추정된다.그리스 신화에서 승리를 관장하는 여신인 니케를 묘사한 대리석상으로, 길이는 328cm이며, 머리와 양팔이 잘려진 채로 남아있다. 현재 프랑스 파리시 루브르 박물관에 전시되어 있다.사모트라케의 니케는 기원전 190년 로도스섬의 주민들이 에게해에서 일어난 해전에서 승리한 것을 기념하기 위해 사모트라키섬에 세운 조각상으로 추정된다. 이 조각상은 1863년 프랑스의 영사 겸 고고학자인 샤를 샴푸아소가 발견했으며, 1884년 루브르 박물관에 소장되어 오늘에 이르고 있다.',
      box4: '/image/세여인.jpg'
    }
},
  { coordinate: { x: 340, y: 395 }, modalContent: {
    box1: '/image/야간순찰.jpg',
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