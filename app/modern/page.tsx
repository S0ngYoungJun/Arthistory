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
    { id: 1, text: '신고전주의', info: '버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.버튼 1에 대한 정보입니다.' },
    { id: 2, text: '낭만주의', info: '버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.버튼 2에 대한 정보입니다.' },
    { id: 3, text: '사실주의', info: '버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.버튼 3에 대한 정보입니다.' },
   
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
    { coordinate: { x: 250, y: 500 }, modalContent: {
      box1: '/image/아침산책(영국.근대).jpg',
      box2: '여섯 점의 회화로 구성된 ‘당세풍의 결혼’ 시리즈는 18세기 말, 영국 사회의 현실을 신랄하게 풍자했던 화가 윌리엄 호가스(William Hogarth, 1697~ 1764)의 대표작이다. 그는 당시에 흔했던 정략결혼의 폐해를 연극의 한 장면처럼 펼쳐보였다. ‘혼인 계약’〈사진〉이 그 첫 장면이다.양가의 가장들이 앉은 테이블에서는 거래가 한창이다. 풍채 좋은 백작이 정복왕 윌리엄으로부터 시작된 뿌리깊은 가문의 족보를 호기롭게 펼쳐보이고 있지만, 통풍으로 못 쓰게 된 그의 오른발은 이미 가세가 기울 대로 기울었음을 증명한다. 맞은편에 앉아 혼인계약서를 손에 쥔 상인은 딸을 백작의 아들에게 시집 보내는 대가로 테이블 가득 금화를 쏟아놓았다. 부유한 상인과 몰락한 귀족은 자식들을 매개로 서로가 간절히 원하던 것, 즉 돈과 권력을 맞바꿨다.정작 결혼 당사자들은 서로에게 관심이 없다. 화려하게 치장한 예비신랑은 거울에 비친 자기 얼굴을 살피느라 여념이 없고, 불안한 듯 약혼반지를 만지작거리는 신붓감은 오히려 친절하게 말을 건네는 변호사에게 귀를 기울인다. 그들 사이에 걸려 있는 그림 속의 섬뜩한 메두사가 다가올 불행을 예고하는 듯하다. 이어지는 다섯 점의 회화는 탐욕으로 시작된 이 결혼이 결국은 불륜과 패행을 거쳐 치정살인과 패가망신으로 치닫는 과정을 보여준다. 재미와 교훈을 동시에 제공하는 이 시리즈는 판화로도 제작돼 선풍적인 인기를 누렸다. 호가스는 냉정한 비판의식으로 사회의 이면을 들춰낸 최초의 풍자화가로 꼽힌다.',
      box3: 'Box 3 내용',
      box4: '/image/앤드루스와그의아내(근대,영국).jpg'
    }
  },
    { coordinate: { x: 740, y: 495 }, modalContent: {
      box1: '/image/남성누드(근대).jpg',
      box2: '<남성 누드>는 고대 조각의 형태미를 추구한 다비드의 기량을 그대로 보여 준다. 마치 자신이 신체의 근육을 얼마나 정교하고 생동감 있게 잘 묘사하는지를 보여 주고자 그린 것처럼 꿈틀대는 근육과 힘줄 하나까지도 세심하게 신경을 썼다. 묘사 효과를 극대화하고자 몸을 뒤틀어 어깻죽지에서 등을 거쳐 허리로 이어지는 근육이 살아나도록 했다. 세부 근육을 하나도 놓치지 않겠다는 듯이 정밀하다. 무게 중심 역할을 하는 오른팔 쪽으로 근육의 흐름을 잡아서 불안한 자세임에도 전혀 위태로워 보이지 않는다. 목과 팔꿈치의 뼈, 무릎 관절과 발목의 복숭아뼈 등이 명확히 표현되어 있어서 전체적 근육 속에 단단한 뼈가 자리 잡고 있으리라는 느낌을 준다. 등허리와 엉덩이 부분에는 깔고 앉은 천의 반사광까지 섬세하게 잡아내고 있어서 실제 인물의 입체성을 생생하게 전달한다.',
      box3: '사모트라케의 니케(그리스어: Νίκη της Σαμοθράκης)는 고대 그리스의 대표적인 조각상 가운데 하나로, 기원전 220년에서 190년 사이에 제작된 것으로 추정된다.그리스 신화에서 승리를 관장하는 여신인 니케를 묘사한 대리석상으로, 길이는 328cm이며, 머리와 양팔이 잘려진 채로 남아있다. 현재 프랑스 파리시 루브르 박물관에 전시되어 있다.사모트라케의 니케는 기원전 190년 로도스섬의 주민들이 에게해에서 일어난 해전에서 승리한 것을 기념하기 위해 사모트라키섬에 세운 조각상으로 추정된다. 이 조각상은 1863년 프랑스의 영사 겸 고고학자인 샤를 샴푸아소가 발견했으며, 1884년 루브르 박물관에 소장되어 오늘에 이르고 있다.',
      box4: '/image/니케.jpg'
    }
  },
    { coordinate: { x: 740, y: 495 }, modalContent: {
      box1: '/image/페르세우스와 안드로메다(근대,독일,멩스).jpg',
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