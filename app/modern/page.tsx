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
    { id: 1, text: '신고전주의', info: '신고전주의(neo-classicism)는 18세기 말 프랑스를 중심으로 유럽에서 발전한 미술 사조다. 고대 그리스와 고대 로마 문화의 고전적 예술로부터 영감을 받은 장식, 시각예술, 문학, 연극, 음악, 건축을 이른다. 18세기 계몽주의와 비슷한 시기에 일어나 19세기 초까지 이어졌으며, 후에 낭만주의와 대립한다. 건축에서는 19세기, 20세기를 넘어 21세기까지 양식이 이어져 오고 있다.' },
    { id: 2, text: '낭만주의', info: '18~19세기 계몽주의와 신고전주의에 반대하여 나타난 낭만주의는 로맨티시즘(Romanticism)이라는 단어의 기원에서 알 수 있듯이 비현실적인, 지나치게 환상적이라는 어원을 가지고 있으며 이성과 합리, 절대적인 것에 대해 거부한 사조였다.계몽주의들이 설파 했던 이성에 대해 강한 회의를 품었지만, 낭만주의자들은 결코 이성이라는 것을 무시하거나 거부하지는 않았다. 그들은 과거 절대적이고 보편적인 의미로 파악 되었던 이성을 역사적 흐름에 따라 변화하는 것으로 수정하여 고려하였다. 또한 이 낭만주의는 개성을 강조하고, 사회를 과거와 달리 하나의 “유기체”로 보았다.' },
    { id: 3, text: '사실주의', info: '서양화의 묘사는 예전부터 철저한 사실을 기본으로 한 것이었으나 특히 사실주의라고 불렸으니만큼 그것은 철저한 성격을 갖는 것이었다. 그것은 사물을 깨끗하게 하고 미화하여 그리는 고전파나, 정열이나 문학적 매력을 구하는 낭만파에 정면으로 도전하는 것이었다. 쿠르베는 천사는 보이지 않기 때문에 그리지 않는다고 했으며, 그의 눈앞에 보이는 현실을 고의로 아름답게 그리는 것이 아니고, 아무런 용서도 없이 현실 그대로 나타낼 것을 주장하고 있다. 그것은 형상에도 색채에도 가장 정확한 관찰을 하여 현실의 재현을 철저하게 할 뿐이다. 더구나 소재도 철저하여 종래의 미술이 외면하던 사회의 가난한 일면이나 노동의 가혹한 실체를 진실로 당면한 사실로서, 박력 있는 묘사로 드러내고 있다. 현실을 보이는 그대로 그리는 표현은 17세기 네덜란드 회화에서도 명백하지만, 쿠르베 작품은 유례없는 박진력을 낳기 때문에 반대측에 있는 사람은 자연을 추하게 만든다고까지 떠들어댔다. 더구나 당시는 시민계급 외에 민중의 입장이 강화되는 시대로서, 쿠르베는 가장 급격한 사회 사상가의 한 사람으로서 깊이 투쟁의 형식까지 취하여 사실주의를 진전시켰다.' },
    { id: 4, text: '인상주의', info: '인상주의(印象主義, impressionism) 또는 인상파(印象派)는 전통적인 회화 기법을 거부하고 색채·색조·질감 자체에 관심을 두는 미술 사조이다.[1] 인상주의를 추구한 화가들을 인상파라고 하는데, 이들은 빛과 함께 시시각각으로 움직이는 색채의 변화 속에서 자연을 묘사하고, 색채나 색조의 순간적 효과를 이용하여 눈에 보이는 세계를 정확하고 객관적으로 기록하려 하였다. 1860년대 파리의 미술가들이 주도하기 시작했다. 인상주의라는 이름은 클로드 모네의 유화 《인상, 해돋이》(Impression, Sunrise)에서 비롯되었는데, 비평가 루이 르로이가 《Le Charivari》지에 기고한 비판에서 처음으로 쓰였었다. 인상주의 미술은 인상주의 음악과 인상주의 문학의 발전에 영향을 주었다.' },
    { id: 5, text: '신인상주의', info: '신인상주의(新印象主義, Neo-impressionism)는 19세기 말의 프랑스 회화 운동 또는 양식의 하나로 인상주의를 계승하면서, 이에 이론과 과학성의 뒷받침을 부여하려는 예술 사조이다. 신인상파라고도 한다.신인상파는 인상파의 색채에 대한 이론을 한층 과학적으로 명백히 한 것인데, 쇠라를 중심으로 극도로 이론적인 제작을 하고 있다. 그것은 인상파가 눈에만 의지하는 색채표현을 과학적으로 발전시킨 것인데, 1886년 제8회 인상파 전시회에 쇠라의 작품이 발표됨으로써 또다시 놀라게 했다. 그것은 당시 과학자에 의하여 색채과학의 연구가 급속도로 발전한 데에도 영향을 받았지만, 쇠라와 병행하여 시냐크도 같은 연구에 몰두했다.' },
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