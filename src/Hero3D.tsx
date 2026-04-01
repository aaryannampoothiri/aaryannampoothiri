import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ height: '60vh', width: '100vw' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Simple animated 3D object as placeholder */}
      <mesh rotation={[0.4, 0.6, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color={'#aa3bff'} metalness={0.7} roughness={0.2} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      <Environment preset="city" />
    </Canvas>
  );
}

export default Hero3D;
