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
  name: string;
}

const App = () => {
  const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });
  const europeRef = useRef<HTMLDivElement>(null); // europe div에 대한 ref
  const [selectedText, setSelectedText] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  const buttonsInfo = [
    { id: 1, text: '피렌체와 르네상스', info: '르네상스란 인문주의의 부활을 상징한다. 고대 로마시대에는 인간의 대한 사유와 탐구에서 비롯한 학문과 예술이 발달하였으나 로마제국이 멸망한 후 발생한 안보의 위협, 경제적 쇠퇴 등으로 인하여 학문과 예술은 꽃피울 수 없었다. 그러나 이탈리아의 중심부에 위치한 피렌체에서 르네상스의 꽃이 다시금 피어나게 되었고 그 덕분에 유럽에서는 다시금 문화와 예술이 꽃피우게 되었다. 그렇다면 다른 곳이 아닌 피렌체에서 르네상스가 시작된 이유는 무엇일까? 당시 피렌체는 상공업이 매우 발달한 도시였다. 발달한 상공업 때문인지 도시에는 사람들로 넘쳐났고 도시는 먹고사는 문제에서 해방되게 되었다. 또한 피렌체의 외교술은 이탈리아에서도 알아줄 정도로 훌륭해서 도시는 항상 안전했다. 문화의 발달에는 안보의 확보가 필수적이다. 그렇기 때문에 피렌체는 르네상스의 발상지로서 조건을 잘 갖추었다.' },
    { id: 2, text: '원근법', info: '원근법은 르네상스(14세기~16세기) 시대부터 본격적으로 그 모습을 드러냈다. 그러나 르네상스 시기 화가들이 이를 자체적으로 발명해낸 것은 아니다. 이탈리아 건축가 브루넬레스키는 이전 이집트, 그리스에서 발견한 수학적, 과학적 사실을 기반으로 원근법이라는 방법을 정립해냈다. 본격적인 원근법이 나타나기 전 소실점의 개념이 대두되는데, 소실점이란 그림 속 물체의 연장선을 그었을 때, 그 선들이 하나로 수렴되어 사라지는 점을 말한다. 이와 실제적 관찰을 기반으로 브루넬레스키는 그림을 그리며 공간 속 물체가 보는 사람에게서 멀어질수록 작게 보인다는 사실을 원근법으로 이론화 시켰다. 즉 르네상스 시대는 우리가 두 눈을 통해 외부 세계를 시각적으로 지각하는 바를 2차원 평면에 수학적으로 그려냈다는 점에서 일명 ‘황금 부흥기’라고 불린다. 이렇듯 르네상스에 접어들어 예술은 원근법을 발판삼아 획기적인 도약을 해내고야 말았다. 추상적이고 일차원적인 묘사에서 시간 속에 사라져버린 그 순간을 팔레트에 완벽히 재현하는데 성공한 것이다.'},
    { id: 3, text: '매너리즘', info: '매너리즘은 레오나르도 다빈치, 라파엘로, 바사리, 초기 미켈란젤로와 같은 예술가들의 조화로운 이상과는 다른 길을 간다. 르네상스 예술이 비례, 균형 및 이상적인 아름다움을 강조하는 반면 매너리즘은 이러한 특성을 과장하여 종종 비대칭이거나 부자연스럽게 우아한 구성을 만든다. 늘어진 형태, 과장되고 균형에서 벗어난 포즈, 조작된 비합리적 공간, 부자연스러운 조명 등등의 특징이 있으며, 인공미를 중시하는 스타일이다. 매너리즘의 특징으로는 왜곡되고 늘어진 구불거리는 형상, 불명료한 구도, 양식적인 속임수와 기괴한 효과 등을 들 수 있다. 콘트라포스트와 인체를 극도로 길게 늘이는 과장된 표현이 조각과 회화에서 자주 등장하는 매너리스트 미술은 열광적 감정, 긴장과 부조화의 느낌, 신경 불안의 감각을 전달한다. 문학과 음악의 매너리즘은 매우 화려한 스타일과 지적 세련미로 유명하다.' },
   
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
    { coordinate: { x: 400, y: 800  }, modalContent: {
      box1: '/image/비너스의탄생.jpg',
      box2: '비너스의 탄생(이탈리아어: La nascita di Venere) 또는 비너스의 탄생은 15세기 르네상스 시대 화가인 산드로 보티첼리의 대표적인 그림 가운데 하나로 이탈리아 피렌체의 우피치 미술관에 전시되어 있다. 로마 신화에서 사랑과 미를 관장하는 여신인 비너스가 성숙한 여성의 모습으로 바다에서 탄생하면서 해안에 상륙하는 내용을 묘사한 그림이다.',
      box3: '모나리자(영어: Mona Lisa)는 16세기 르네상스 시대에 레오나르도 다 빈치가 그린 초상화로, 현재 프랑스 파리 루브르 박물관에 전시되어 있다. "모나"(mona)는 유부녀 이름 앞에 붙이는 이탈리아어 경칭이고, "리자"(Lisa)는 초상화의 모델이 된 여인의 이름이다. 즉, 한국어로 하면 "리자 여사"라는 뜻이 된다. 이탈리아와 프랑스에서는 라 조콘다(이탈리아어: La_Gioconda, 프랑스어: La_Joconde)라 하는데 이는 "조콘도의 부인" 또는 "명랑한 여자", "웃고 있는 여자"라는 뜻이다.',
      box4: '/image/모나리자.jpg'
    },
    name:"이탈리아"
  },
    { coordinate: { x: 400, y: 630 }, modalContent: {
      box1: '/image/산토끼.jpg',
      box2: '산토끼 한 마리를 그린 단독 작품이다. 토끼 한 마리가 장식도 배경도 없이 홀로 그려져 있으며 정사각형 도화지의 대부분을 차지하고 있다. 토끼는 왼쪽 상단에서 오른쪽 하단 방향의 대각선 측면으로 바라본 시선에서 쪼그리고 앉아 있는 모습이며, 토끼의 시선 역시 한쪽 모서리 공간을 향하며 그 너머의 공간을 바라보고 있다. ',
      box3: '알브레히트 뒤러가 그렸다는 “잔디밭” 수채화 두 점이 전해진다. 그림 크기에 따라 각각 “큰잔디밭”, “작은잔디밭”이라 불린다. 위의 그림은 “큰잔디밭”이다.아틀리에에서 조합한 것이란 증거는 우선 눈높이다. 그림의 눈높이가 매우 낮은데 실제로 풀밭을 이렇게 포착하려면 바닥에 엎드린 상태로 그려야 했을 것이다. 뿌리까지 그린 것으로 보아서도 뽑아서 하나씩 그린 다음에 합성했음이 틀림없어 보인다. 그리고 그림의 구도다. 숙련된 예술가의 솜씨로 오른쪽 앞에서 왼쪽 뒤로 시선을 유도하고 전면에 밝고 넓은 잎을 두어 강조했으며 뒤에 그림자처럼 짙은 녹색의 잎으로 명암을 넣어 깊이를 주었다. 실제 이 정도 크기의 풀밭에서는 관찰하기 어려운 현상이다. 그러나 화폭에서는 매우 설득력있다. ',
      box4: '/image/풀밭.jpg'
    },
    name:"신성로마제국"
  },
    { coordinate: { x: 340, y: 550 }, modalContent: {
      box1: '/image/바벨탑.jpg',
      box3: '지친 사냥꾼들이 발목까지 차오르는 눈을 헤치고 터벅터벅 발걸음을 옮기고 있다. 고개를 푹 숙인 사냥꾼 세 명은 물론 뒤따르는 사냥개들까지 풀이 죽은 모습이다. 오늘 수확이라고는 작은 여우 한 마리가 전부라서다. 뒤로 보이는 허름한 여관 앞에서는 사람들이 짚불을 쬐고 있다. 언덕 너머로 시선을 돌리면 눈 덮인 마을과 산의 풍경, 얼어붙은 연못 위에서 즐겁게 스케이트를 타는 사람들의 모습이 보인다. 피터르 브뤼헐(1528~1569)의 대표작 ‘눈 속의 사냥꾼’이다.      눈 속의 사냥꾼은 (네덜란드어: Die Jäger im Schnee) 네덜란드의 유명 화가 피터르 브뤼헐의 1565년 작품이다. 이 작품은 일 년을 묘사한 여섯 작품 중 하나이다. 현재는 오스트리아 빈 미술사 박물관에 전시되고 있다. 이 그림은 북부 르네상스 운동의 영향을 받았다.',
      box2: '브뤼헐이 그린 ‘바벨탑(The Tower of Babel)’은 매우 역동적이고 놀라울 정도로 세밀하여 ‘숨은 그림 찾기’에 가깝다. 그림에서 가장 먼저 눈에 들어오는 것은 석공에게 다가오는 한 무리의 사람들이다. 틀림없이 탑의 건축을 명령한 니므롯 왕과 일행들이다. 특히 왕의 뒤에 회색 가운을 입은 성직자 같은 사람은 ‘회색수사’로 불리던 시토 수도회를 표현한 것이라고 추측된다. 이 시대에 수사와 같은 종교가의 책무는 모든 사회구성원들에게 명확한 가치관을 제시하고 윤리적이고 경제적인 행동원칙을 마련하는 것이었다.',
      box4: '/image/눈속의사냥꾼.jpg'
    },
    name:"브라반트 공국"
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