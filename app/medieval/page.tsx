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
    { id: 1, text: '비잔틴미술', info: '323년, 콘스탄티누스 대제는 서양 역사에서 가장 중요한 결단을 내렸다. 로마 제국의 수도를 그리스의 비잔티움으로 천도하기로 결정한 것이다. 비잔티움은 그때부터 콘스탄티노플이라 불리우게 되었고, 오늘날 이스탄불이라는 이름으로 바뀌었다. 당시 대제는 자신의 결정이 결국 동로마와 서로마로 분할될 것이라는 것은 꿈에도 몰랐을 것이다. 천도한지 불과 100년도 못가서 로마제국은 분할되었고, 서로마는 중앙집권적 권력체계가 붕괴되었다. 이와달리 동로마는 외세의 침입을 이겨내고 유스티니아누스 치하에서 국력과 안정을 되찾게 된다. 이시기 동로마에서 꽃핀 미술을 비잔틴 미술이라 한다.비잔틴 미술의 특징이라면 중앙식 돔 교회와 화려한 모자이크라고 할 수 있다. 동유럽으로 건너간 유럽미술은 화려한 색체와 장식을 가진 동방의 그리스 취향을 기독교미술로 발전시켰다는 특징이 있다. 거대한 돔이 얹어진 형태의 교회가 나타났고, 화려한 모자이크가 꽃피었다.' },
    { id: 2, text: '로마네스크', info: '10세기부터 12세기(지역에 따라서는 13세기 전반까지)경까지를 로마네스크 시대라 부르며, 11세기에서 12세기 초에 걸쳐 그 전성기를 이루었다. 로마네스크란 원래 건축사상의 용어였다. 두꺼운 석조의 벽체(壁體), 아치, 돔을 가진 건축에 끼친 고대로마의 영향을 크게 받아서 로마네스크(로마풍)라는 호칭을 붙였으나, 그 후 개념의 변화가 생겨 고대 로마의 전통을 가미하고 에스파냐를 거쳐 전해진 사라센 양식(樣式)이나, 활발해진 수도원 상호간의 교류, 십자군, 성지 순례 등을 통하여 전래된 동방 여러 지역의 양식 또는 카롤링거 양식, 비잔틴 양식 등이 상호 영향을 주고받으며 생겨난 중세 중기의 양식을 가리키게 되었다.' },
    { id: 3, text: '예수', info: '중세 후기로 갈수록 미술작품의 예수 묘사에서 인간적인 면모가 드러납니다. 특히나 주제적인 면에서 "예수수난" 이 자주 등장합니다. 예수 수난은 예수가 십자가에 못 박히고 돌아가시는 일련의 장면을 일컫습니다. 회화와 조각 작품들은 예수의 괴로움과 비애에 초점을 맞추어 그것을 극대화해서 표현합니다. 예수 수난 장면이 미술작품의 주제가 되었다는 것은 결국 세계관이 바뀌었다는 것을 뜻합니다. 지성적이고 귀족적이었던 종교는 이제 감성적이고 대중적인 종교로 나아갑니다.' },
   
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
    { coordinate: { x: 810, y: 700 }, modalContent: {
      box1: '/image/황후와수행자들.jpg',
      box2: '산비탈레 성당,  ',
      box3: '유스티니아누스 황제는 비잔틴 제국의 황제로, 로마 제국의 영토를 일부 회복하고 로마법을 정리하는 등 많은 업적을 남겼습니다.이 모자이크는 이탈리아 라벤나에 있는 산 비탈레 성당에 있는 것으로, 유스티니아누스 황제와 그의 수행원들이 성찬예배에 참여하는 모습을 묘사하고 있습니다.황제는 화려한 옷을 입고 왕관을 쓰고 있으며, 그의 왼쪽에는 막시미아누스 주교, 오른쪽에는 벨리사리우스 장군이 서 있습니다.황제의 뒤에는 원형의 후광이 나타나고 있으며, 그의 발 아래에는 신하가 엎드려 있습니다.병사들의 방패에는 라바룸 십자가가 새겨져 있습니다.',
      box4: '/image/황제와수행자들.jpg'
    },
   name:"비잔틴"
  },
    { coordinate: { x: 400, y: 800 }, modalContent: {
      box1: '/image/그리스도의애도(중세,이탈리아).jpg',
      box2: '조토의 대표작 ‘애도’(Lamentation)를 보면 그의 그림이 추상적이고 상징적인 과거의 영상이 아닌 감동적이고 실제적인 삶을 다루고 있음을 느낄 수 있다.인물들이 전면에 등장하고 그들의 동작과 표정, 제스처로 내면의 감정을 표현한다. 황금빛 배경이 사라졌으며 화면을 가로지르는 대각선의 언덕은 관객의 시선을 예수에게로 향하는 구도를 이룬다. 단축법을 사용해 화면 중앙의 두 팔을 펼친 사람의 팔 모양에서 거리감이 느껴지게 하였다. 뒷모습을 보인 채 앉아 있는 인물들은 실제로 예수를 둘러싸고 있는 현장감을 구현한다.엄격하게 정면성과 위계적 차이를 유지하는 비잔틴양식 대신에 관찰자의 시점을 고려해 그림이 한 눈에 들어오게 하는 3차원의 양식을 개발함으로 실제적인 공간감과 입체감이 느껴지게 하였다.',
      box3: '이탈리아 회화의 아버지로 불리는 조반니 치마부에 Giovanni Cimabue의 <십자가의 예수>는 이전 미술과 확연한 차이를 보여 준다. 신의 영광을 묘사하기 위한 도구라는 점에서는 동일하지만 회화적 표현에서 사실 요소가 대폭 강화되었다. <십자가의 예수>는 장엄한 예수가 아닌 고통에 찬 예수의 모습을 그렸다. 과거에는 예수를 의연한 모습으로 표현해 불멸의 이미지를 살리려 했다. 하지만 치마부에의 그림에서 십자가에 매달린 예수는 고통스러워하는 모습 그대로다.무엇보다도 생생한 신체 묘사가 한눈에 들어온다. 머리는 옆으로 기울었고 몸은 활처럼 휘어져 밑으로 축 늘어졌다. 손과 발, 몸의 근육도 나름대로는 사실에 가깝게 다가서려 노력한 흔적이 보인다. 압권은 고통으로 일그러진 표정이다. 고난과 아픔을 당하고 있는 모습을 통해 인간적인 측은함마저 느끼게 된다. 예수의 오른쪽 팔옆에 그려져 있는 성모 그림에서도 표정이 읽힌다. 아직 어색하기는 하지만 미간의 주름, 눈과 입술의 모양을 조절하여 슬픈 감정을 구현했다. 또한 적극적으로 명암법을 사용하여 입체감을 더했다.치마부에의 <십자가의 예수>는 비잔틴 미술의 전통을 계승하면서도 사실적인 표현을 통해 새로운 시대를 열었다. 이 그림은 이탈리아 회화의 발전에 중요한 역할을 했다.',
      box4: '/image/십자가의예수.jpg'
    },
    name:"이탈리아"
  },
    { coordinate: { x: 300, y: 620 }, modalContent: {
      box1: '/image/노트르담.jpg',
      box2: '파리 노트르담 대성당(프랑스어: Cathédrale Notre-Dame de Paris 카테드랄 노트르담 드 파리[*])은 프랑스 파리 시테 섬 동쪽 반쪽에 있는 프랑스 후기고딕 양식의 성당이다. 이 대성당은 지금도 로마 가톨릭교회의 교회 건물로서 파리 대주교좌 성당으로 사용되고 있다. 노트르담 대성당은 흔히 프랑스 고딕 건축의 정수로 이야기된다. 이 대성당은 프랑스의 유명한 건축가인 비올레르뒤크에 의해 파괴된 상태에서 보호되어 복구되었다. “노트르담”은 “우리의 귀부인”이라는 뜻의 프랑스어다(성모 마리아를 의미함). 노트르담 대성당은 최초의 고딕 성당 가운데 하나이며, 고딕 전 시대에 걸쳐 건설하였다. 대성당의 조각들과 스테인드글라스는 자연주의의 영향을 많이 받았으며, 이는 초기 로마네스크 건축에서 부족한 세속적인 외관을 더해준다. 노트르담 대성당은 세계에서 최초로 벽날개를 사용한 건물이기도 하다. ',
      box3: '생드니 대성당(프랑스어: Basilique de Saint-Denis)은 프랑스 파리 북부 생드니에 위치한 고딕 양식의 성당으로, 7세기경 다고베르 1세에 의해 지어졌다. 프랑스의 역대 군주들을 비롯해 프랑스의 왕족들의 유해가 잠들어 있는 것으로 유명한데, 프랑스 혁명 중에는 군중에 의해 묘가 훼손되는 수난을 겪기도 했다. 백년 전쟁에서 큰 활약을 했던 프랑스의 군인 베르트르 게클랭의 묘 또한 이곳에 있다. 역사적으로, 건축학적으로 큰 가치가 있는 건물로 현재 프랑스의 세계유산 잠정 목록에 올라가 있다. 프랑스의 수호성인 성 드니는 첫 파리 주교가 되었다. 그는 3세기 중반 몽마르트르 언덕에서 그의 추종자 두 명과 함께 3세기 중반 몽마르트르 언덕에 참수를 당하였으며, 그후 그의 머리를 그가 묻히고 싶다고 했던 현재의 교회가 있는 장소에 가져다 두었다고 말해진다. 마르티리움이 그의 무덤이 있는 곳에 세워져, 5세기와 6세기에 유명한 순례지가 되었다.',
      box4: '/image/생드니대성당.jpg'
    },
   name:"프랑스"
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