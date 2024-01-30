"use client"
import React, { useState, useEffect ,useMemo } from 'react';
import styles from "@/component/spaceship2.module.scss"
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

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

interface Spaceship3Props {
  initialPosition: MarkerData[]; // 여기서 MarkerData는 좌표와 모달 컨텐츠를 포함하는 타입입니다.
}

const Spaceship3 = ({ initialPosition }: Spaceship3Props) => {
  const [positionIndex, setPositionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // 초기에 isMoving을 false로 설정
  const [targetPoint, setTargetPoint] = useState<Coordinate | null>(null); 
  const [modalContent, setModalContent] = useState<ModalContent>({ box1: '', box2: '', box3: '', box4: '' });

  const currentPosition = useMemo(() => initialPosition[positionIndex], [positionIndex,initialPosition]);

  const flyToTarget = (pointIndex: number) => {
    const target = initialPosition[pointIndex].coordinate;
    setTargetPoint(target); // 여기를 수정했습니다릭한 마커의 좌표를 targetPoint로 설정
    setPositionIndex(pointIndex);
    setModalContent(initialPosition[pointIndex].modalContent);
    setIsMoving(true);
  };

  useEffect(() => {
    const currentPosition = initialPosition[positionIndex].coordinate; // 여기를 수정했습니다
   
    if (isMoving && targetPoint) {
      const distance = Math.sqrt(
        Math.pow(targetPoint.x - currentPosition.x, 2) +
        Math.pow(targetPoint.y - currentPosition.y, 2)
      );
  
      const speedFactor = 0.02;
      const step = speedFactor * distance;
      
      if (distance == step) {
        setIsMoving(false);
        setTimeout(() => {
          setIsModalOpen(true);
        }, 2000); // 3초 후에 실행
        setTargetPoint(null); // 목표 지점에 도달했으므로 초기화
        setPositionIndex(initialPosition.findIndex(p => p.coordinate.x === targetPoint.x && p.coordinate.y === targetPoint.y)); // 목표 지점의 인덱스로 업데이트
      } else {
        const newX = currentPosition.x + (step * (targetPoint.x - currentPosition.x)) / distance;
        const newY = currentPosition.y + (step * (targetPoint.y - currentPosition.y)) / distance;
        // 여기에서 currentPosition을 업데이트해야 합니다 (예: setState를 사용하여 위치 상태 업데이트)
      }
    }
  }, [isMoving, targetPoint, positionIndex,initialPosition]);

 
  const openModal = () => {
    setIsModalOpen(true);
    setIsMoving(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsMoving(true);
  };

  const renderMarkers = () => {
    // 부모 요소의 크기를 가정
    const parentWidth = 1480; // 예시 값
    const parentHeight = 600; // 예시 값
  
    return initialPosition.map((point, index) => {
      // 백분율로 위치 계산
      const leftPercentage = (point.coordinate.x / parentWidth) * 100;
      const topPercentage = (point.coordinate.y / parentHeight) * 100;
  
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${leftPercentage}%`,
            top: `${topPercentage}%`,
            width: 10,
            height: 10,
            backgroundColor: 'red',
            borderRadius: '50%'
          }}
          onClick={() => flyToTarget(index)}
        />
      );
    });}

  return (
    <div>
      {renderMarkers()} {/* 이 부분에 마커를 렌더링합니다. */}
      <div className={styles.spaceship} style={{ left: currentPosition.coordinate.x, top: currentPosition.coordinate.y }}>
        <FontAwesomeIcon icon={faPlane} size="1x" />
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* 모달 내용 */}
        <div className={styles.top}>
        <div className={styles.title}></div>
        <button onClick={closeModal}>닫기</button>
        </div>
        <div className={styles.box1}><img style={{width:"25vw", height:"45vh",objectFit:"fill"}} src={modalContent.box1} alt="Box 1 Image" /></div>
        <div className={styles.box2}>{modalContent.box2}</div>
        <div className={styles.box3}>{modalContent.box3}</div>
        <div className={styles.box4}><img style={{width:"25vw", height:"45vh",objectFit:"fill"}} src={modalContent.box4} alt="Box 4 Image" /></div>
      </Modal>
      {!isMoving && (
        <div className={styles.overlay} onClick={() => setIsMoving(true)}>
          {/* 이 부분에 움직임이 멈출 때의 화면을 가리키는 오버레이 컴포넌트를 넣을 수 있습니다. */}
          {/* 이 오버레이를 클릭하면 모달이 닫히고 우주선의 이동이 재개됩니다. */}
        </div>
      )}
    </div>
  );
}


export default Spaceship3;