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
  initialPosition: MarkerData[];
  parentDimensions: { width: number; height: number }; // 부모 컨테이너의 크기를 전달받습니다.
}

const Spaceship3 =  ({ initialPosition, parentDimensions,}: Spaceship3Props) => {
  const [positionIndex, setPositionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // 초기에 isMoving을 false로 설정
  const [targetPoint, setTargetPoint] = useState<Coordinate | null>(null); 
  const [modalContent, setModalContent] = useState<ModalContent>({ box1: '', box2: '', box3: '', box4: '' });
  const [currentMarkerPositions, setCurrentMarkerPositions] = useState<Coordinate[]>([]);
  const [planePosition, setPlanePosition] = useState<Coordinate>({ x: 30, y: 30 });

  const currentPosition = useMemo(() => initialPosition[positionIndex], [positionIndex,initialPosition]);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 비행기의 초기 위치를 (30, 30)으로 설정
    setPlanePosition({ x: 30, y: 30 });
  }, []); // 의존성 배열을 비워 컴포넌트 마운트 시에만 실행되도록 함

  const flyToTarget = (pointIndex: number) => {
    const target = initialPosition[pointIndex].coordinate;
    setTargetPoint(target);
    setPositionIndex(pointIndex);
    setModalContent(initialPosition[pointIndex].modalContent);
    setIsMoving(true);
    const xxx= target.x* 17/20
    const yyy= target.y* 5/8
    // 비행기의 위치를 클릭한 마커의 위치로 업데이트
    setPlanePosition({ x: xxx, y:  yyy}); // 여기서 위치 업데이트
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
      } 
      // else {
      //   const newX = currentPosition.x + (step * (targetPoint.x - currentPosition.x)) / distance;
      //   const newY = currentPosition.y + (step * (targetPoint.y - currentPosition.y)) / distance;
      //   // 여기에서 currentPosition을 업데이트해야 합니다 (예: setState를 사용하여 위치 상태 업데이트)
      // }
    }
  }, [isMoving, targetPoint, positionIndex,initialPosition]);

  useEffect(() => {
    const newMarkerPositions = initialPosition.map(marker => {
      const xPercentage = marker.coordinate.x / 1000; // 예시 비율 계산
      const yPercentage = marker.coordinate.y / 1000; // 예시 비율 계산
      return {
        x: xPercentage * parentDimensions.width,
        y: yPercentage * parentDimensions.height
      };
    });
    setCurrentMarkerPositions(newMarkerPositions);
  }, [initialPosition, parentDimensions]);
  
  const openModal = () => {
    setIsModalOpen(true);
    setIsMoving(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsMoving(true);
  };

  const renderMarkers = () => {
    return currentMarkerPositions.map((position, index) => (
      <div
        key={index}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)', // 정확한 위치 조정
        }}
        onClick={() => flyToTarget(index)}
      />
    ));
  };


    useEffect(() => {
      // parentDimensions 상태가 변경될 때 실행될 로직
      const recalculateMarkerPositions = () => {
        const newInitialPosition = initialPosition.map(marker => {
          // 화면 크기에 따라 새로운 마커 위치 계산
          // 예: 화면 너비와 높이에 대한 마커의 위치 비율을 계산
          const newX = (marker.coordinate.x / 1000) * parentDimensions.width;
          const newY = (marker.coordinate.y / 1000) * parentDimensions.height;
          return {
            ...marker,
            coordinate: { x: newX, y: newY }
          };
        });
    
        // 필요한 경우, 새로운 위치 정보를 상태에 저장하고 마커를 업데이트하는 로직을 여기에 추가
        // 예: setInitialPosition(newInitialPosition); (이 경우 initialPosition 상태 관리 필요)
      };
    
      recalculateMarkerPositions();
    }, [parentDimensions, initialPosition]);

  return (
    <div>
      {renderMarkers()} {/* 이 부분에 마커를 렌더링합니다. */}
      <div
        className={styles.spaceship}
        style={{
          position: 'absolute',
          left: `${planePosition.x}px`, // 비행기 위치 상태를 사용하여 위치 설정
          top: `${planePosition.y}px`,
          transform: 'translate(-50%, -50%)' // 비행기 이미지의 중심이 정확한 위치를 가리키도록 조정
        }}>
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