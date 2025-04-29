/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true, bookingData }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band bookingData={bookingData} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, bookingData }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  // Get event type for styling
  const eventType = getEventType(bookingData);
  
  // Create a texture in-memory instead of loading from file
  const [texture] = useState(() => {
    // Create a canvas to draw the lanyard texture based on event type
    return createLanyardTexture(eventType, bookingData);
  });

  // Create card texture with booking info and poster image if available
  const [cardTexture] = useState(() => {
    return createCardTexture(eventType, bookingData);
  });
  
  // Create badge texture for event type
  const [badgeTexture] = useState(() => {
    return createBadgeTexture(eventType);
  });

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.50, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            {/* Card with texture */}
            <mesh>
              <boxGeometry args={[1.6, 2.25, 0.05]} />
              <meshPhysicalMaterial 
                map={cardTexture} 
                map-anisotropy={16} 
                clearcoat={1} 
                clearcoatRoughness={0.15} 
                roughness={0.9} 
                metalness={0.8} 
              />
            </mesh>
            
            {/* Event type badge */}
            <mesh position={[0, 1.0, 0.03]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.6, 0.2]} />
              <meshStandardMaterial 
                color={getEventColor(eventType)} 
                metalness={0.6} 
                roughness={0.3}
              />
            </mesh>
            
            {/* Badge text using a texture instead of TextGeometry */}
            <mesh position={[0, 1.0, 0.035]}>
              <planeGeometry args={[0.5, 0.15]} />
              <meshBasicMaterial 
                map={badgeTexture} 
                transparent={true} 
                depthWrite={false}
              />
            </mesh>
            
            {/* Simple clasp */}
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
              <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// Helper function to determine event type from booking data
function getEventType(bookingData) {
  if (!bookingData) return 'generic';
  
  if (bookingData.artist) return 'concert';
  
  // Simple string matching to determine event type
  const title = (bookingData.title || '').toLowerCase();
  
  if (title.includes('comedy') || 
      title.includes('laugh') || 
      title.includes('stand-up') || 
      title.includes('funny')) {
    return 'comedy';
  }
  
  return 'movie'; // Default to movie
}

// Get event type label for badge
function getEventTypeLabel(eventType) {
  switch (eventType) {
    case 'concert': return 'CONCERT';
    case 'comedy': return 'COMEDY';
    case 'movie': return 'MOVIE';
    default: return 'EVENT';
  }
}

// Get color based on event type
function getEventColor(eventType) {
  switch (eventType) {
    case 'concert': return '#ff3366'; // Pink/red
    case 'comedy': return '#ffaa00';  // Orange
    case 'movie': return '#33aaff';   // Blue
    default: return '#33cc88';        // Teal
  }
}

// Create badge texture for event type label
function createBadgeTexture(eventType) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas with transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Add text
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(getEventTypeLabel(eventType), canvas.width / 2, canvas.height / 2);
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Create lanyard texture based on event type
function createLanyardTexture(eventType, bookingData) {
  // Create a canvas to draw the texture
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  
  // Set colors based on event type
  let primaryColor, secondaryColor;
  switch (eventType) {
    case 'concert':
      primaryColor = '#ff3366';
      secondaryColor = '#9900cc';
      break;
    case 'comedy':
      primaryColor = '#ffaa00';
      secondaryColor = '#ff6600';
      break;
    case 'movie':
      primaryColor = '#33aaff';
      secondaryColor = '#0066cc';
      break;
    default:
      primaryColor = '#33cc88';
      secondaryColor = '#009966';
  }
  
  // Fill with gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, primaryColor);
  gradient.addColorStop(0.3, secondaryColor);
  gradient.addColorStop(0.7, secondaryColor);
  gradient.addColorStop(1, primaryColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add pattern based on event type
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  
  if (eventType === 'concert') {
    // Music notes pattern
    const symbols = ['♪', '♫', '♬', '♩'];
    ctx.font = '20px Arial';
    for (let i = 0; i < canvas.width; i += 50) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      ctx.fillText(symbol, i, 50 + Math.random() * 30);
    }
  } else if (eventType === 'comedy') {
    // Laughing pattern
    ctx.font = '20px Arial';
    for (let i = 0; i < canvas.width; i += 70) {
      const text = Math.random() > 0.5 ? 'HA!' : 'LOL!';
      ctx.fillText(text, i, 50 + Math.random() * 30);
    }
  } else {
    // Default striped pattern
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.fillRect(i, 30, 15, 40);
    }
  }
  
  // Add text
  ctx.font = 'bold 30px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText('SHOWLY', canvas.width / 2, 60);
  
  // Add event title if available
  if (bookingData?.title) {
    ctx.font = '20px Arial';
    ctx.fillText(bookingData.title.substring(0, 30), canvas.width / 2, 30);
  }
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Create card texture with booking info and poster image
function createCardTexture(eventType, bookingData) {
  // Create a canvas to draw the card texture
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');
  
  // Choose different background styles based on event type
  let bgColor1, bgColor2;
  switch (eventType) {
    case 'concert':
      bgColor1 = '#330033';
      bgColor2 = '#660066';
      break;
    case 'comedy':
      bgColor1 = '#663300';
      bgColor2 = '#994400';
      break;
    case 'movie':
      bgColor1 = '#001133';
      bgColor2 = '#002266';
      break;
    default:
      bgColor1 = '#002233';
      bgColor2 = '#004455';
  }
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, bgColor1);
  gradient.addColorStop(1, bgColor2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add a noise texture for better appearance
  addNoiseTexture(ctx, 0, 0, canvas.width, canvas.height);
  
  // Create a placeholder for where the poster image would go
  const posterHeight = 300;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(50, 90, canvas.width - 100, posterHeight);
  
  // Draw a "poster frame" border
  ctx.strokeStyle = getEventColor(eventType);
  ctx.lineWidth = 4;
  ctx.strokeRect(50, 90, canvas.width - 100, posterHeight);
  
  // Ticket border
  ctx.strokeStyle = getEventColor(eventType);
  ctx.lineWidth = 6;
  ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
  
  // Add a ticket stub perforation
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(15, 420);
  ctx.lineTo(canvas.width - 15, 420);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Header
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('ADMISSION', canvas.width / 2, 50);
  
  // Add "badge" design elements based on event type
  if (eventType === 'concert') {
    // Concert badge
    drawCircleBadge(ctx, 70, 60, 40, getEventColor(eventType), '♫');
  } else if (eventType === 'comedy') {
    // Comedy badge
    drawCircleBadge(ctx, 70, 60, 40, getEventColor(eventType), '!');
  } else {
    // Movie badge
    drawCircleBadge(ctx, 70, 60, 40, getEventColor(eventType), '★');
  }
  
  // Event name - use booking data if available
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(bookingData?.title || 'SHOWLY EVENT', canvas.width / 2, 450);
  
  // Artist - only show if available
  if (bookingData?.artist) {
    ctx.font = '22px Arial';
    ctx.fillText(bookingData.artist, canvas.width / 2, 480);
  }
  
  // Venue
  ctx.font = '18px Arial';
  ctx.fillText(`VENUE: ${bookingData?.venue || 'SHOWLY THEATER'}`, canvas.width / 2, 520);
  
  // Date and Time
  const dateStr = bookingData?.date || new Date().toLocaleDateString();
  const timeStr = bookingData?.time || '';
  ctx.fillText(`DATE: ${dateStr}`, canvas.width / 2, 550);
  if (timeStr) {
    ctx.fillText(`TIME: ${timeStr}`, canvas.width / 2, 580);
  }
  
  // Seat info if available
  if (bookingData?.seatsInfo) {
    ctx.fillText(`SEATS: ${bookingData.seatsInfo}`, canvas.width / 2, 610);
  }
  
  // Booking ID if available
  if (bookingData?.bookingId) {
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`ID: ${bookingData.bookingId}`, canvas.width / 2, 650);
  }
  
  // Barcode
  ctx.fillStyle = '#ffffff';
  for (let i = 80; i < canvas.width - 80; i += 4) {
    const height = Math.random() * 80 + 20;
    ctx.fillRect(i, 670, 2, height);
  }
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Helper function to add noise texture
function addNoiseTexture(ctx, x, y, width, height, alpha = 0.03) {
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.floor(Math.random() * 255);
    data[i] = (data[i] + noise * alpha) % 255;
    data[i + 1] = (data[i + 1] + noise * alpha) % 255;
    data[i + 2] = (data[i + 2] + noise * alpha) % 255;
  }
  
  ctx.putImageData(imageData, x, y);
}

// Helper function to draw a circular badge
function drawCircleBadge(ctx, x, y, radius, color, symbol) {
  // Draw circle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw symbol
  ctx.fillStyle = 'white';
  ctx.font = `bold ${radius}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, x, y);
} 