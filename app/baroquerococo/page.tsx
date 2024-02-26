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
    { id: 1, text: '바로크', info: '바로크(프랑스어: Baroque, Baroque, 이탈리아어: Barocco, 독일어: Barock, 문화어: 바로끄)는 서양 예술사에서 시대를 구분하는 용어이자 예술 사조의 한 유형이기도 하다. 어원은 ‘일그러진 진주’를 의미하는 포르투갈어 pérola barroca의 프랑스 전사인 Baroque에서 유래했다. barocco 라는 이탈리아어에서 나왔다는 설도 있는데, 뜻은 왜곡된 삼단논법, 혹은 불협화음으로 인한 비정상적인 소리를 의미한다. 바로크의 예술적 표현 양식은 르네상스 이후 17세기에서 18세기에 걸쳐 서양의 미술, 음악, 건축에서 잘 나타나고 있다. 양식의 변천에 따라 바로크의 시대는 전기, 중기 그리고 후기로 나뉜다. 예술적 경향에서 보면 후기 바로크 시대는 곧 로코코 시대로 넘어가는 과도기라고 볼 수 있다. 유명한 음악도 많이 있다. 예를 들어 미뉴에트 같은 음악이 있다. 파격적 효과, 감각적 풍요, 생동감 있는 동적 표현, 화려하고 풍부한 장식 등이 주요 특징이다. 르네상스 양식의 균형과 조화에 반하여, 최소한의 질서 안에서 우연과 자유분방함이 강조된다.' },
    { id: 2, text: '로코코', info: '로코코(Rococo 또는 Late Baroque)는 18세기 프랑스에서 생겨난 예술형식이다. 어원은 프랑스어 rocaille(조개무늬 장식, 자갈)에서 왔다.로코코는 바로크 시대의 호방한 취향을 이어받아 경박함 속에 표현되는 화려한 색채와 섬세한 장식, 건축의 유행을 말한다. 바로크 양식이 수정, 약화 된 것이라 할 수 있다. 또한 로코코는 왕실예술이 아니라 귀족과 부르주아의 예술이다. 다시 말하자면, 유희와 쾌락의 추구에 몰두해 있던 루이 14세 사후, 18세기 프랑스 사회의 귀족계급이 추구한, 사치스럽고 우아한 성격 및 유희적이고 변덕스러운 매력을, 그러나 동시에 부드럽고, 내면적인 성격을 가진 사교계 예술을 말하는 것이다. 귀족계급의 주거환경을 장식하기 위해 에로틱한 주제나 아늑함과 감미로움이 추구되었고 개인의 감성적 체험을 표출하는 소품위주로 제작되었다. 또한 로코코에서는 신와저리가 많이 유행하였다.' },

  ];

  const handleButtonClick = (info : any) => {
    setSelectedText(info); // 클릭된 버튼에 할당된 텍스트로 상태 업데이트
    setAnimationKey(prevKey => prevKey + 1); 
  };
  useEffect(() => {
    // 효과 함수 내에서 europeRef.current 값을 로컬 변수에 복사
    const currentRef = europeRef.current;
  
    const updateSize = () => {
      if (currentRef) {
        setParentDimensions({
          width: currentRef.offsetWidth,
          height: currentRef.offsetHeight,
        });
      }
    };
  
    // 초기 크기 설정
    updateSize();
  
    // ResizeObserver를 사용하여 크기 변화 감지
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
  
    if (currentRef) {
      resizeObserver.observe(currentRef);
    }
  
    // 클린업 함수에서는 복사된 로컬 변수를 사용
    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, []); // 의존성 배열이 빈 배열이라면 효과는 컴포넌트 마운트 시 한 번만 실행됩니다.


  const initialPosition: MarkerData[] = [
    { coordinate: { x: 400, y: 800 }, modalContent: {
      box1: '/image/고대로마의베루타.jpg',
      box2: '그림은 건축 카프리치오 장르에 속합니다. 거대하고 상상 속의 갤러리실에는 18세기 중반에 나타난 고대 로마의 장소와 건축물을 묘사한 그림이 전시되어 있습니다. 또한 마치 고고학 박물관의 내부를 표현한 것처럼 로마 시대의 유명한 조각품도 있습니다. 경우를 제외하고는 Pannini의 그림을 미니어처로 재현하지 않습니다. 상상의 박물관은 고대 로마의 유적을 설명하기 위한 방편이지 화가의 작품 목록을 전파하기 위한 방편이 아니기 때문입니다. 커다란 커튼처럼 실크 시트가 맨 위의 장면을 장식합니다. 하얀 천사들이 터널의 거대한 아치형 천장에서 날아오르는 것처럼 보입니다. ',
      box3: '「베드로의 순교」는 이탈리아 화가 카라바조가 로마의 산타마리아 델 포폴로 교회에서 주문을 받고 그린 그림이다. 비슷한 크기로 그린 「바오로의 개종」과 함께 체라시 경당의 측면 제단화로 들어갈 작품이었다. 베드로는 허연 백발이다. 예수님을 처음 만났을 때 이미 장가까지 갔다니까 순교할 당시에는 예순을 훌쩍 넘겼을 것이다. 손과 발에는 이미 쇠못이 박혔고, 인부 셋이 달려들어서 십자가를 일으켜 세우고 있다. 미리 파둔 구덩이에다 십자가 끝을 파묻고 땅을 다지면 집행이 완성된다.그런데 이 그림에는 군더더기가 전혀 없다. 종려가지를 든 천사도 없고, 몰려든 구경꾼의 탄식도 안 보인다. 처형을 집행하는 로마 장교와 그의 부하들도 죄다 생략했다. 심지어 십자가에 달린 순교자의 표정에도 과장이 하나도 없다. 쇠못을 움켜쥔 손과 이마에 패인 몇 가닥의 주름이 견디기 힘든 고통을 말할 뿐이다. 이런 고통은 주님을 만나고 로마로 다시 돌아왔을 때부터 각오했을 것이다.',
      box4: '/image/베드로의순교(바로크이탈리아).jpg'
    },
    name: '이탈리아'
  },
    { coordinate: { x: 300, y: 620 }, modalContent: {
      box1: '/image/사비니 여인의 납치(프랑스,바로크).jpg',
      box2: '사비니 여인들의 강간은 “사비니 여인의 납치” 또는 “사비니 여인의 약탈”로도 알려진 로마 신화의 사건으로, 로마의 남성들은 이 지역의 다른 도시에서 젊은 여성을 대량으로 납치했다. 그것은 특히 르네상스와 르네상스 이후 시대에 화가와 조각가의 빈번한 주제였다. 니콜라 푸생은 이 주제의 두 가지 주요 버전을 제작했다. 그의 초기 버전은 사비니 여인들의 납치라는 제목이었고, 1633-1634년 경에 완성되었을 가능성이 크다. 이 그림은 로물루스가 로마인들에게 납치 신호를 보내는 모습을 묘사하고 있다. 더메트(Met)에 따르면 푸생의 작업 주제는 포즈와 제스처에 대한 이해와 로마 건축에 대한 지식을 강조할 수 있게 해주었다.[8] 이 버전의 그림은 현재 뉴욕 메트로폴리탄 미술관에 소장되어 있다. ',
      box3: '사랑을 기념하는 작품으로, 수많은 큐피드가 커플 주위를 날아다니며 서로를 더 가깝게 밀고 있으며, 비너스(사랑의 여신)의 동상도 있습니다. 전경에는 세 쌍의 연인이 있습니다. 조각상 오른쪽에 있는 커플이 여전히 열정적인 밀회를 하고 있는 동안, 또 다른 커플이 일어나 세 번째 쌍을 따라 언덕 아래로 내려갑니다. 하지만 세 번째 쌍의 여성은 여신의 신성한 숲을 다정한 눈길로 돌아봅니다. 언덕 기슭에는 왼편에 있는 황금배에 탑승할 준비를 하는 행복한 커플들이 더 있습니다. 가볍고 가느다란 붓터치로 배경의 흐릿한 풍경은 계절, 새벽인지 황혼인지 전혀 알 수 없습니다. 제목에도 불구하고 섬의 사람들은 특히 이미 짝을 이루었기 때문에 도착하기보다는 떠나는 것처럼 보인다는 사실이 자주 언급되었습니다. 많은 미술사가들은 사랑의 섬으로의 항해에 대한 우화에 대해 다양한 해석을 내놓았습니다. Watteau 자신은 의도적으로 답변을 제공하지 않았습니다.',
      box4: '/image/키테라섬으로의_출항(로코코,프랑스).jpg'
    },
    name: '프랑스'
  },
    { coordinate: { x: 250, y: 490 }, modalContent: {
      box1: '/image/결혼계약.jpg',
      box2: '그 그림의 줄거리는 두 아버지, 올더맨과 백작의 완화되지 않은 탐욕입니다. 올더맨은 지나치게 부유하고, 백작은 많은 빚을 지고 있지만 여전히 그의 고대 타이틀을 유지하고 있습니다. 올더맨은 귀족 아들의 할아버지가 되는 것을 열망하고, 백작은 그의 혈통이 계속 이어지도록 하기를 원하고, 그의 돈을 위해 평범한 올더맨을 기꺼이 참아냅니다. 한편, 곧 결혼할 두 사람은 서로를 완전히 무시하고 있고, 신부는 변호사의 구애를 받고 있습니다. 무수한 세부 사항들은 특히 백작과 그의 아들의 실제 성격을 보여줍니다.',
      box3: '앤드류씨 부부는 1750년경 토마스 게인즈버러가 현재의 런던 국립 갤러리에 그린 유화입니다. 오늘날 그것은 그의 가장 유명한 작품 중 하나이지만, 1960년까지 방문객의 가족에 남아 있었고 1927년 입스위치에서 열린 전시회에 나타나기 전까지 거의 알려지지 않았으며, 그 후 영국과 해외의 다른 전시회에 정기적으로 요청되었고, 그 매력과 신선함으로 비평가들로부터 찬사를 받았습니다. 그것의 상징적인 지위는 전후에 확립되었고, 그것은 1953년 파리에서 열린 엘리자베스 2세 여왕의 대관식을 기념한 전시회에서 영국 미술을 대표하기 위해 선택된 네 점의 그림 중 하나였습니다. 곧 그 그림은 18세기 영국에서 온정주의와 자본주의 사회의 패러다임으로 적대적인 정밀 조사를 받기 시작했지만, 그것은 여전히 확고한 대중의 선호로 남아 있습니다',
      box4: '/image/앤드류씨부부.jpg'
    },
    name:'잉글랜드'
},
  { coordinate: { x: 340, y: 555 }, modalContent: {
    box1: '/image/야간순찰.jpg',
    box2: '《야경》에는 세 가지 중요한 요소가 있다. 첫 번째는 거대한 크기(437x363 cm), 두 번째는 빛과 그림자의 적절한 사용(명암대비), 마지막으로 당시 군인들의 초상을 그렸다는 점이다.《야경》은 네덜란드 황금 시대의 정점에 있던 1642년에 완성되었다. 작품은 작품명과 동명인, 검은색 복장에 적색 요대를 띤 대장 프란스 반닝 코크와 황색 복장에 백색 요대를 띤 중위 빌럼 반 루이텐부르크가 있다. 렘브란트는 빛과 그림자를 적절히 사용하여 시선이 중요한 세 곳-배경이 되는 군중, 중앙에 있는 대장 프란스 반닝 코크와 중위 빌럼 반 루에텐부르크, 중앙 좌측에 있는소녀에게 향하게 된다. 그 사람들 뒤에는 민병대의 상징을 들고 있는 소위 얀 Visscher Cornelissen가 있다.',
    box3: '그림 속 아들은 여행을 마치고 유산을 낭비하고 가난과 절망에 빠진 비참한 모습으로 집으로 돌아왔습니다. 그는 아버지 앞에 무릎을 꿇고 회개하며 용서를 구하고 아버지 집에서 종의 지위를 구하며 심지어 아버지의 종들도 자기보다 삶에서 더 나은 지위를 가지고 있음을 깨달았습니다. 그의 아버지는 그를 다정한 몸짓으로 맞아주고 자기 아들처럼 맞아준다. 그의 손은 어머니 역할과 아버지 역할을 동시에 암시하는 것 같습니다. 왼쪽은 아들의 어깨에 올려져 더 크고 남성적으로 보이는 반면, 오른쪽은 더 부드럽고 몸짓을 더 잘 받아들입니다. [3] 오른편에는 탕자의 형이 서 있는데, 그는 양손을 교차하여 심판하고 있습니다. 비유에서 그는 죄 많은 아들에 대한 아버지의 동정심을 반대합니다.',
    box4: '/image/돌아온탕자.jpg'
  },
  name:"네덜란드"
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