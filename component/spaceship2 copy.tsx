"use client"
import React, { useState, useEffect, useMemo } from 'react';
import styles from "@/component/spaceship2.module.scss";
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

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
  parentDimensions: { width: number; height: number };
}

const Spaceship3 = ({ initialPosition, parentDimensions }: Spaceship3Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // 초기에 isMoving을 false로 설정
  const [targetPoint, setTargetPoint] = useState<Coordinate | null>(null); 
  const [modalContent, setModalContent] = useState<ModalContent>({ box1: '', box2: '', box3: '', box4: '' });
  const [currentMarkerPositions, setCurrentMarkerPositions] = useState<Coordinate[]>([]);
  const [planePosition, setPlanePosition] = useState<Coordinate>({ x: 30, y: 30 });
  

  // Convert initialPosition to a state to update its values dynamically based on parentDimensions
  const [dynamicMarkerPositions, setDynamicMarkerPositions] = useState<MarkerData[]>(initialPosition);

  useEffect(() => {
    // Recalculate marker positions based on parentDimensions
    const updatedMarkerPositions = initialPosition.map(marker => {
      return {
        ...marker,
        coordinate: {
          x: marker.coordinate.x / 1000 * parentDimensions.width,
          y: marker.coordinate.y / 1000 * parentDimensions.height,
        }
      };
    });
    setDynamicMarkerPositions(updatedMarkerPositions);
  }, [parentDimensions]); // Recalculate whenever parentDimensions change

  // Adjust the plane position when clicking on a marker
  const flyToTarget = (index: number) => {
    const target = dynamicMarkerPositions[index].coordinate;
    setIsMoving(true);
    setPlanePosition(target); // Update plane position directly to clicked marker's position
    setModalContent(dynamicMarkerPositions[index].modalContent);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 2000); 
  };

  const renderMarkers = () => {
    return dynamicMarkerPositions.map((marker, index) => (
      <div key={index}
           style={{
             position: 'absolute',
             left: `${marker.coordinate.x}px`,
             top: `${marker.coordinate.y}px`,
             width: '10px',
             height: '10px',
             backgroundColor: 'red',
             borderRadius: '50%',
             cursor: 'pointer',
             transform: 'translate(-50%, -50%)',
           }}
           onClick={() => flyToTarget(index)}
      />
    ));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsMoving(true);
  };

  return (
    <div>
      {renderMarkers()}
      <div className={styles.spaceship}
           style={{
             position: 'absolute',
             left: `${planePosition.x}px`,
             top: `${planePosition.y}px`,
             transform: 'translate(-50%, -50%)',
           }}>
        <FontAwesomeIcon icon={faPlane} size="1x" />
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* 모달 내용 */}
        <div className={styles.top}>
        <div className={styles.title}></div>
        <button onClick={closeModal}>닫기</button>
        </div>
        <div className={styles.box1}><Image fill={true} src={modalContent.box1} alt="Box 1 Image" /></div>
        <div className={styles.box2}>{modalContent.box2}</div>
        <div className={styles.box3}>{modalContent.box3}</div>
        <div className={styles.box4}><Image fill={true} src={modalContent.box4} alt="Box 4 Image" /></div>
      </Modal>


      {!isMoving && (
        <div className={styles.overlay} onClick={() => setIsMoving(true)}>
          {/* Overlay component */}
        </div>
      )}
    </div>
  );
};

export default Spaceship3;
