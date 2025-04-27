import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SpaceBackground from "../components/SpaceBackground.jsx"; // Import here

function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/start"); // (you'll create this page next)
  };

  return (
    <>
      <SpaceBackground /> {/* Add space background here */}
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Hero Section */}
        <Box
          sx={{
            color: 'white',
            py: { xs: 8, md: 10 },
            textAlign: 'center',
            px: 2,
            mb: 4,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              Personalized Health & Fitness Plans
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Your Body is Unique. Your Plan Should Be Too.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mt: 4, fontSize: '1rem', px: 4, py: 1.5 }}
              onClick={handleStart}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* About Section */}
        <Box sx={{ py: 8, px: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom align="center" fontWeight="bold">
              Why Personalization Matters?
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Generic fitness plans ignore your body's unique needs, allergies, conditions, and goals. 
              Our AI system analyzes YOUR data to build a fully customized health roadmap — just for you.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
