import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sphere } from "@react-three/drei";
import { Box } from "@mui/material";

// Create a 3D Gym background with Three.js
function GymBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: -1,
        top: 0,
        left: 0,
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} />
        
        {/* Environment - Gym background or realistic HDRI image */}
        <Environment files="/path_to_your_hdri_image.hdr" />
        
        {/* Placeholder 3D gym objects */}
        <Sphere args={[1, 64, 64]} position={[-2, 0, 0]}>
          <meshStandardMaterial color="orange" />
        </Sphere>

        {/* Add more 3D models here, such as gym equipment */}
        
        {/* OrbitControls to interact with the 3D scene */}
        <OrbitControls />
      </Canvas>
    </Box>
  );
}

export default GymBackground;
