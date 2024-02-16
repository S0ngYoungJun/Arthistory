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
      box3: '"순수의 시대"는 1785년 또는 1788년에 제작된 조슈아 레이놀즈 경의 유화로, 크기는 765 x 638mm입니다. 관람객은 알려지지 않았지만 아마도 레이놀즈의 증조부 테오필라 그와트킨(1785년에 세 살, 1788년에 여섯 살) 또는 말버러의 4대 공작의 막내딸인 앤 스펜서(1773–1865)였을 것입니다. 이 그림은 로버트 버논에 의해 1847년에 국립 미술관에 전시되었고 1951년부터 테이트 브리튼에 걸려 있습니다. 그 그림은 인물 연구이거나, 18세기로 표현하면, 멋진 그림입니다. 이전 그림이 약간의 물감 손실을 겪었기 때문인지, 그것은 또 다른 레이놀즈의 작품인 "딸기 소녀" 위에 그려졌습니다. 손만 원래 상태로 남아 있습니다. 1859년 이후, 덧칠의 악화도 문서화되었습니다.',
      box4: '/image/순수의시대.jpg'
    },
   name:"그레이트브리튼"
  },
    { coordinate: { x: 300, y: 620 }, modalContent: {
      box1: '/image/남성누드(근대).jpg',
      box2: '<남성 누드>는 고대 조각의 형태미를 추구한 다비드의 기량을 그대로 보여 준다. 마치 자신이 신체의 근육을 얼마나 정교하고 생동감 있게 잘 묘사하는지를 보여 주고자 그린 것처럼 꿈틀대는 근육과 힘줄 하나까지도 세심하게 신경을 썼다. 묘사 효과를 극대화하고자 몸을 뒤틀어 어깻죽지에서 등을 거쳐 허리로 이어지는 근육이 살아나도록 했다. 세부 근육을 하나도 놓치지 않겠다는 듯이 정밀하다. 무게 중심 역할을 하는 오른팔 쪽으로 근육의 흐름을 잡아서 불안한 자세임에도 전혀 위태로워 보이지 않는다. 목과 팔꿈치의 뼈, 무릎 관절과 발목의 복숭아뼈 등이 명확히 표현되어 있어서 전체적 근육 속에 단단한 뼈가 자리 잡고 있으리라는 느낌을 준다. 등허리와 엉덩이 부분에는 깔고 앉은 천의 반사광까지 섬세하게 잡아내고 있어서 실제 인물의 입체성을 생생하게 전달한다.',
      box3: '영국을 제외한 유럽 전역을 통일한 프랑스의 황제 나폴레옹. 자크 루이 다비드의「알프스를 넘는 나폴레옹」은 나폴레옹이 북이탈리아를 침공하기 위해 알프스를 넘는 역사적 순간을 묘사했다. 앞발을 치켜든 백마와 그 위에 올라탄 붉은 망토의 나폴레옹. 그림 속 나폴레옹은 거친 폭풍우를 뚫고 알프스 너머를 향해 당장이라도 달려 나갈 듯 용맹하다. 나폴레옹의 명성은 그의 업적과 함께 이 작품 속 이미지로 완성됐다고 해도 과언이 아니다.',
      box4: '/image/나폴레옹.jpg'
    },
    name: "프랑스"
  },
    { coordinate: { x: 340, y: 555 }, modalContent: {
      box1: '/image/별이빛나는밤.jpg',
      box2: '고흐의 대표작 중 하나로 꼽히는 《별이 빛나는 밤》은 그가 폴 고갱과 다툰 뒤 자신의 귀를 자른 사건 이후 생레미의 요양원에 있을 때 그린 것이다. 그는 병실 밖으로 내다보이는 밤 풍경을 기억과 상상을 결합시켜 그렸는데, 이는 자연에 대한 반 고흐의 내적이고 주관적인 표현을 구현하고 있다. 고흐에게 밤하늘은 무한함을 주는 대상이었고, 이보다 먼저 제작된 아를의 《밤의 카페 테라스》나 《론 강 위로 별이 빛나는 밤》에서도 별이 반짝이는 밤의 정경을 다루었다. 고흐는《별이 빛나는 밤》의 작업을 마쳤을 때 그다지 좋게 생각하지 않았다고 한다. 작품이 소개될 당시 미술계의 반응도 변변찮았다.',
      box3: '반 고흐는 1889년 5월, 요양원에 들어간 지 한 달 만에 병원 정원의 자연 속에서 붓꽃 그림을 그리기 시작했습니다 . [1] 후기 작품에서 볼 수 있는 하이텐션이 부족하다. 그는 그림을 계속 그리면 미쳐가는 것을 막을 수 있다고 느꼈기 때문에 그림을 "내 병의 피뢰침"이라고 불렀습니다. 이 그림은 아마도 그의 작품이나 당시 다른 예술가들의 작품과 마찬가지로 일본 우키요 에 목판화 의 영향을 받았을 것입니다 . 강한 윤곽, 클로즈업 뷰를 포함한 특이한 각도, 그리고 밋밋한 로컬 색상(빛의 감소에 따라 모델링되지 않음)에서 유사점이 발생합니다. 그림은 부드러움과 가벼움으로 가득 차 있습니다. 붓꽃은 비극 없는 생명력으로 가득 차 있습니다.',
      box4: '/image/아이리스.jpg'
    },
    name: "네덜란드"
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