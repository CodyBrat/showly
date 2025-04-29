/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// Create geometry directly instead of importing GLB
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
  
  // Create a texture in-memory instead of loading from file
  const [texture] = useState(() => {
    // Create a canvas to draw the texture
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Fill with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ff3366');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, '#ff3366');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some design elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.fillRect(i, 40, 20, 2);
    }
    
    // Add text
    ctx.font = '30px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('SHOWLY', canvas.width / 2, 60);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  });

  // Create card texture with booking info
  const [cardTexture] = useState(() => {
    // Create a canvas to draw the card texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#222255');
    gradient.addColorStop(1, '#000022');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ticket border
    ctx.strokeStyle = '#ff3366';
    ctx.lineWidth = 15;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
    
    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ADMISSION', canvas.width / 2, 100);
    
    // Event name - use booking data if available
    ctx.font = 'bold 36px Arial';
    ctx.fillText(bookingData?.title || 'SHOWLY EVENT', canvas.width / 2, 200);
    
    // Artist - only show if available
    if (bookingData?.artist) {
      ctx.font = '28px Arial';
      ctx.fillText(bookingData.artist, canvas.width / 2, 250);
    }
    
    // Venue
    ctx.font = '24px Arial';
    ctx.fillText(`VENUE: ${bookingData?.venue || 'SHOWLY THEATER'}`, canvas.width / 2, 300);
    
    // Date and Time
    const dateStr = bookingData?.date || new Date().toLocaleDateString();
    const timeStr = bookingData?.time || '';
    ctx.fillText(`DATE: ${dateStr}`, canvas.width / 2, 350);
    if (timeStr) {
      ctx.fillText(`TIME: ${timeStr}`, canvas.width / 2, 390);
    }
    
    // Seat info if available
    if (bookingData?.seatsInfo) {
      ctx.fillText(`SEATS: ${bookingData.seatsInfo}`, canvas.width / 2, 430);
    }
    
    // Booking ID if available
    if (bookingData?.bookingId) {
      ctx.font = 'bold 32px Arial';
      ctx.fillText(`ID: ${bookingData.bookingId}`, canvas.width / 2, 500);
    }
    
    // Barcode
    ctx.fillStyle = '#ffffff';
    for (let i = 50; i < canvas.width - 50; i += 4) {
      const height = Math.random() * 80 + 20;
      ctx.fillRect(i, 550, 2, height);
    }
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
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
            {/* Simple card made with box geometry instead of imported GLB */}
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