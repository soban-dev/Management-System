import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Switch,
  FormControlLabel,
  CssBaseline,
  Grid,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Book";
import GitHubIcon from "@mui/icons-material/Badge";
import GoogleIcon from "@mui/icons-material/Person";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom"; 
import backgroundImage from "../../assets/bg-sign-up-cover.jpeg";
import axios from "axios"; 
import { BASE_URL } from "../../config";

const BackgroundBox = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
});

const StyledContainer = styled(Box)({
  backgroundColor: "#ffffffeb",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 1.2)",
  paddingTop: "50px",
  paddingBottom: "20px",
  width: "100%",
  maxWidth: "600px",
  position: "relative",
});

const HeaderBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-47px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#1976d2",
  color: "white",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 1.2)",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "13px 75px", 

  [theme.breakpoints.down("lg")]: {
    padding: "36px 62px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "36px 20px",
  },
}));

const SocialButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "10px",

 
  [theme.breakpoints.up("lg")]: { 
    display: "flex",
  },
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));


const SocialButton = styled(Avatar)({
  backgroundColor: "white",
  color: "#1976d2",
  cursor: "pointer",
  border: "1px solid #1976d2",
  width: "40px",
  height: "40px",
});

const FormBox = styled(Box)({
  padding: "20px",
});

const ScrollableFieldsBox = styled(Box)({
  maxHeight: "400px",
  overflowY: "auto",
  marginTop: "25px",
});

export default function EmployRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    cnic: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
      console.log("Server Response:", response.data); 

      if (response.data.success) {
       
        navigate("/sign-in");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <BackgroundBox>
      <CssBaseline />
      <StyledContainer>
        <HeaderBox>
          <Typography variant="h5" fontFamily="Roboto, sans-serif">
            Employee Registration
          </Typography>
          <SocialButtonsBox>
            <SocialButton>
              <FacebookIcon />
            </SocialButton>
            <SocialButton>
              <GitHubIcon />
            </SocialButton>
            <SocialButton>
              <GoogleIcon />
            </SocialButton>
          </SocialButtonsBox>
        </HeaderBox>
        <FormBox>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <ScrollableFieldsBox>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="phone"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    autoComplete="address"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cnic"
                    label="CNIC"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleChange}
                    autoComplete="cnic"
                  />
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label="Agree to Terms and Conditions"
                    sx={{ marginTop: 2 }}
                  />
                </Grid>
              </Grid>
            </ScrollableFieldsBox>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                padding: "10px",
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
            >
              REGISTER
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: "#1976d2",
                cursor: "pointer",
              }}
            >
              <Link to="/sign-in" style={{ textDecoration: "none", color: "#1976d2" }}>
                Already have an account? Sign in
              </Link>
            </Typography>
          </Box>
        </FormBox>
      </StyledContainer>
    </BackgroundBox>
  );
}
