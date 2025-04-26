import { Box } from "@mui/material";

function SpaceBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
        top: 0,
        left: 0,
        background: "black",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "300%",
          height: "300%",
          background: `radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          animation: "moveSpace 60s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes moveSpace {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-500px, -500px); }
          }
        `}
      </style>
    </Box>
  );
}

export default SpaceBackground;
