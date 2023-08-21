import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import forgotPassBgImg from "../../assets/images/forgotBg.png";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { PasswordStrengthTooltip } from "../../ui-component/tooltips/password_strength_tooltip";
import { useDataSources } from '../../service/UserRegistration';

const steps = ["Verify identity", "Reset Password", "Finished"];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const { verifyEmailForResetPassword, resetPassword } = useDataSources();

  const isMobileView = () => {
    return window.innerWidth < 750;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("This is a required field.");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      validateEmail();
      if (!email || emailError) return;
      try {
        setBusy(true);
        const response = await verifyEmailForResetPassword(email);
        console.log("sdbc", response)
        if (response.message == "OTP sent successfully") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } catch (errors) {
        console.log("in errors");
        return;
      } finally {
        setBusy(false);
      }
    }
  };

  const handleReset = () => {
    setEmail("");
    setVerificationCode("");
    setConfirmPassword("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = () => {
    const passwordReset = async () => {
      try {
        const response = await resetPassword(email, verificationCode, password);
        console.log("response of user resetPassword", response)
        if (response.message == "Password reset successfully.") {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } catch (error) {
        console.error('Error creating error:', error);
      }
    };
    if (activeStep === 1) {
      if (
        !validateVerificationCode() ||
        !validatePassword() ||
        !validateConfirmPassword()
      )
        return;
    }
    passwordReset();
    handleReset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("This is a required field.");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return false;
    } else {
      const passwordInstructions = [
        {
          text: "Password must contain a upper case letter",
          check: () => /[A-Z]/.test(password),
        },
        {
          text: "Password must contain a lower case letter",
          check: () => /[a-z]/.test(password),
        },
        {
          text: "Password must contain a number",
          check: () => /\d/.test(password),
        },
      ];

      const invalidInstructions = passwordInstructions.filter(
        (instruction) => !instruction.check()
      );

      if (invalidInstructions.length === 0) {
        setPasswordError("");
        return true;
      }
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("This is a required field.");
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Password and confirm password do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateVerificationCode = () => {
    if (!verificationCode) {
      setVerificationCodeError("This is a required field.");
      return false;
    }
    setVerificationCodeError("");
    return true;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        className="forgot-password-page-container"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "70px 0px" }}
      >
        <img
          className="forgot-password-page-bgimage"
          src={forgotPassBgImg}
          alt="Logo"
          style={{
            height: "60%",
            width: "100%",
          }}
        />
        <Box
          className="forgot-password-page-content"
          position="absolute"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box className="forgot-password-page-stepper-container">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    className="forgot-password-page-stepper"
                    sx={{ color: "rgba(0,0,0,.45)", fontSize: "16px" }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Grid
            className="forgot-password-page-step-content"
            container
            spacing={2}
            justifyContent="center"
            sx={{
              mt: 2,
              width: "60%",
              minWidth: "400px",
            }}
          >
            {activeStep === 0 && (
              <Grid item xs={12} md={6}>
                <Typography
                  className="forgot-password-page-emailInstructor-text"
                  sx={{
                    fontSize: "16px",
                    margin: emailError ? "25px 0px 15px 0px" : "30px 0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <InfoTwoToneIcon sx={{ marginTop: "2px", marginRight: "6px" }} />
                  Please enter the email address of the account to retrieve your password
                </Typography>
                <Box
                  sx={{
                    display: isMobileView() ? "block" : "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="forgot-password-page-step-inputlable"
                    sx={{
                      mr: 1,
                      width: isMobileView() ? "100%" : "200px",
                      display: isMobileView() ? "none" : "block",
                    }}
                  >
                    Email Address:
                  </Box>
                  <TextField
                    className="forgot-password-page-inputfield"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    error={!!emailError}
                    helperText={emailError}
                    variant="outlined"
                    fullWidth
                    placeholder={isMobileView() ? "Email Address" : ""}
                  />
                </Box>
                <Box
                  className="forgot-password-page-stepcontent-button"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    width: "100%",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ background: "57afe7" }}
                  >
                    Submit &nbsp;{busy && <CircularProgress color="warning" size={16} />}
                  </Button>
                </Box>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid
                item
                xs={12}
                md={6}
                className="forgot-password-page-secondstep"
                sx={{ height: "210px" }}
              >
                <Box
                  className="forgot-password-page-secondstep-otpsentmessage"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    m: 2,
                    minWidth: isMobileView() ? '100%' : '200px',
                  }}
                >
                  <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
                    {`Verification code has been sent to "${email}"`}
                  </Typography>
                </Box>
                <Box
                  className="forgot-password-step-inputfield-box"
                  sx={{
                    display: isMobileView() ? "block" : "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  <Box
                    sx={{
                      mr: 1,
                      minWidth: isMobileView() ? "100%" : "200px",
                      display: isMobileView() ? "none" : "block",
                    }}
                  >
                    Verification Code:
                  </Box>
                  <TextField
                    className="forgot-password-page-inputfields"
                    size="small"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 6 }}
                    error={!!verificationCodeError}
                    helperText={verificationCodeError}
                    onBlur={validateVerificationCode}
                    placeholder={isMobileView() ? "Verification code" : ""}
                  />
                  <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                    Resend
                  </Button>
                </Box>
                <Box
                  className="forgot-password-step-inputfield-box"
                  sx={{
                    display: isMobileView() ? "block" : "flex",
                    alignItems: "center",
                    width: "100%",
                    margin: "20px",
                  }}
                >
                  <Box
                    sx={{
                      mr: 1,
                      minWidth: isMobileView() ? "100%" : "200px",
                      display: isMobileView() ? "none" : "block",
                    }}
                  >
                    Password:
                  </Box>
                  <TextField
                    className="forgot-password-page-inputfields"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    error={!!passwordError}
                    helperText={passwordError}
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder={isMobileView() ? "Password" : ""}
                    InputProps={{
                      endAdornment: (
                        <Box
                          onClick={togglePasswordVisibility}
                          sx={{
                            cursor: "pointer",
                            color: "rgba(0, 0, 0, 0.54)",
                          }}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </Box>
                      ),
                    }}
                  />
                  <PasswordStrengthTooltip
                    password={password}
                    validatePassword={validatePassword}
                  />
                </Box>
                <Box
                  className="forgot-password-step-inputfield-box"
                  sx={{
                    display: isMobileView() ? "block" : "flex",
                    alignItems: "center",
                    width: "100%",
                    margin: "20px",
                  }}
                >
                  <Box
                    sx={{
                      mr: 1,
                      minWidth: isMobileView() ? "100%" : "200px",
                      display: isMobileView() ? "none" : "block",
                    }}
                  >
                    Confirm Password:
                  </Box>
                  <TextField
                    className="forgot-password-page-inputfields"
                    size="small"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    type={showConfirmPassword ? "text" : "password"}
                    onBlur={validateConfirmPassword}
                    placeholder={isMobileView() ? "Confirm password" : ""}
                    InputProps={{
                      endAdornment: (
                        <Box
                          onClick={toggleConfirmPasswordVisibility}
                          sx={{
                            cursor: "pointer",
                            color: "rgba(0, 0, 0, 0.54)",
                          }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </Box>
                      ),
                    }}
                  />
                </Box>
                <Box
                  className="forgot-password-page-stepcontent-button"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    width: "100%",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ background: "57afe7" }}
                  >
                    Submit &nbsp;{busy && <CircularProgress color="warning" size={16} />}
                  </Button>
                </Box>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid
                item
                xs={12}
                md={6}
                className="forgot-password-page-thirdstep"
                sx={{ height: "200px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    margin: "20px",
                  }}
                >
                  <Typography
                    sx={{ padding: "10px", fontSize: 24, fontWeight: 600 }}
                  >
                    Reset Successfully!
                  </Typography>
                </Box>
                <Box
                  className="forgot-password-page-stepcontent-button"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    width: "100%",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{ background: "57afe7" }}
                  >
                    Finish
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
