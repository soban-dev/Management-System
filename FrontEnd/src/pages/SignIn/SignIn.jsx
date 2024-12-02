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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Book";
import GitHubIcon from "@mui/icons-material/Badge";
import GoogleIcon from "@mui/icons-material/Person";
import { styled } from "@mui/system";
import backgroundImage from "../../assets/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";

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
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  paddingTop: "50px",
  paddingBottom: "20px",
  width: "100%",
  maxWidth: "400px",
  position: "relative",
});

const HeaderBox = styled(Box)({
  position: "absolute",
  top: "-47px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#1976d2",
  color: "white",
  borderRadius: "12px",
  padding: "13px 75px",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SocialButtonsBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "10px",
});

const SocialButton = styled(Avatar)({
  backgroundColor: "white",
  color: "#1976d2",
  // cursor: "pointer",
  border: "1px solid #1976d2",
  width: "40px",
  height: "40px",
  // opacity:'0',
});

const FormBox = styled(Box)({
  padding: "20px",
});

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" }); // State for form data
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Save username and password to array (optional step)
    const usersArray = [];
    usersArray.push({ username: formData.username, password: formData.password });
    console.log("Saved User:", usersArray);
  
    // Send data to backend
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',  // Important: This sends cookies with the request
      });
  
      const result = await response.json();
      console.log("Response from backend213:", result);
      localStorage.setItem("token", result.token) // Console log response
  
      // Check if the login was successful based on response from backend
      if (result.success === true) {
        // Store the role in localStorage or sessionStorage
        // Role set karna localStorage mein condition ke sath
          if (result.role === "employee") {
            localStorage.setItem("role", "user");  // Agar role "employee" hai toh "user" store karo
            } else {
             localStorage.setItem("userRole", result.role);  // Agar "employee" nahi hai toh original role store karo
                 } // Store the role
            // result.role='admin'
        // Use role to determine the navigation path
        if (result.role === "admin") {
          // Navigate to the homepage if the user is admin
          navigate("/dashboard");
          console.log(result.role)
        } else if(result.role === "employee"){
          // Navigate to billing if the user is not admin
          navigate("/billing");
        }
      } else {
        // Handle failed login (optional: display message, etc.)
        console.log("Login failed", result.message);
      }
    } catch (error) {
      console.error("Error:", error); // Handle errors during the fetch
    }
  };
  console.log(localStorage.getItem("userRole"))
  // console.log(result.role)

  return (
    <BackgroundBox>
      <CssBaseline />
      <StyledContainer>
        <HeaderBox>
          <Typography variant="h5" fontFamily="Roboto, sans-serif">
            Sign in
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange} // Handle input change
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange} // Handle input change
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Remember me"
              sx={{ marginTop: 2 }}
            />
            <Button className="rounded-[10px]"  
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                // borderRadius: "10px",
              }}
            >
              SIGN IN
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => navigate("/sign-up")} // Redirect to sign-up page
            >
              Don’t have an account? Sign up
            </Typography>
          </Box>
        </FormBox>
      </StyledContainer>
    </BackgroundBox>
  );
}
