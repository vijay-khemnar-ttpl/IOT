import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, Link, MenuItem, CircularProgress } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import forgotPassBgImg from "../../assets/images/forgotBg.png";
import { PasswordStrengthTooltip } from "../../ui-component/tooltips/password_strength_tooltip";
import { useDataSources } from "../../service/UserRegistration";

const steps = ["Create Account", "Verify Email Address", "Finished"];

const NewRegister = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [server, setServer] = useState("Asia");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [fisrtnameError, setFirstNameError] = useState("");
    const [lastnameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [verficationCodeError, setVerificationCodeError] = useState("");
    const [gotOtp, setGotOtp] = useState(false);

    const { busy, userRegister, verifyUser } = useDataSources(firstname, lastname, email, password, verificationCode, server,);

    const handleNext = () => {
        const createAccount = async () => {
            try {
                const response = await userRegister(firstname, lastname, email, password, server);
                if (response.request.statusText) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setGotOtp(true);
                }
            } catch (error) {
                console.error('Error creating error:', error);
            }
        };
        if (activeStep === 0) {
            if (!validateEmail() || !validatePassword() || !validateConfirmPassword()) {
                return;
            }
        }
        createAccount();
    };

    const handleReset = () => {
        setActiveStep(0);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setServer("");
        setAgreed(false);
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setVerificationCodeError("");
    };

    const handliSubmit = () => {
        const verifyingUser = async () => {
            const response = await verifyUser(email, verificationCode);
            if (response.request.statusText == "Created") {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        };
        if (activeStep === 1) {
            if (!validateVerificationCode()) {
                return;
            }
        }
        verifyingUser();
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    const isNextButtonDisabled = () => {
        return !(agreed);
    };

    const isSubmitButtonDisabled = () => {
        return !(verificationCode);
    };

    const validateFirstName = () => {
        if (!firstname) {
            setFirstNameError("This is required field.");
            return false;
        }
    }

    const validateLastName = () => {
        if (!firstname) {
            setLastNameError("This is required field.");
            return false;
        }
    }

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("This is a required field.");
            return false;
        } else if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return false;
        }
        setEmailError("");
        return true;
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
                { text: "Password must contain a upper case letter", check: () => /[A-Z]/.test(password) },
                { text: "Password must contain a lower case letter", check: () => /[a-z]/.test(password) },
                { text: "Password must contain a number", check: () => /\d/.test(password) },
            ];

            const invalidInstructions = passwordInstructions.filter(instruction => !instruction.check());

            if (invalidInstructions.length === 0) {
                setPasswordError("");
                return true;
            }
        }
    }

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
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ padding: "70px 0px" }}
            >
                <img
                    src={forgotPassBgImg}
                    alt="Logo"
                    style={{
                        height: "60%",
                        width: "100%",
                    }}
                />
                <Box
                    position="absolute"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                        bottom: "40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        marginBottom: "160px",
                    }}
                >
                    <Box
                        sx={{
                            width: "60%",
                            position: "sticky",
                            top: "100px",
                        }}
                    >
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel
                                        sx={{ color: "rgba(0,0,0,.45)", fontSize: "16px" }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Grid
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: fisrtnameError ? "2px" : "15px",
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>First Name:</Box>
                                    <TextField
                                        size="small"
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!fisrtnameError}
                                        helperText={fisrtnameError}
                                        onBlur={validateFirstName}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: lastnameError ? "2px" : "15px"
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>Last Name:</Box>
                                    <TextField
                                        size="small"
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!lastnameError}
                                        helperText={lastnameError}
                                        onBlur={validateLastName}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: emailError ? "2px" : "15px"
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>Email Address:</Box>
                                    <TextField
                                        size="small"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!emailError}
                                        helperText={emailError}
                                        onBlur={validateEmail}
                                    />
                                    <PasswordStrengthTooltip password={password} validatePassword={validatePassword} />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: passwordError ? "2px" : "15px"
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>Password:</Box>
                                    <TextField
                                        size="small"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        type={showPassword ? "text" : "password"}
                                        onBlur={validatePassword}
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
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: confirmPasswordError ? "2px" : "15px"
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>Confirm Password:</Box>
                                    <TextField
                                        size="small"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!confirmPasswordError}
                                        helperText={confirmPasswordError}
                                        type={showConfirmPassword ? "text" : "password"}
                                        onBlur={validateConfirmPassword}
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
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", mr: 1, width: "200px" }}>
                                        Server <HelpOutlineIcon sx={{ marginTop: "2px" }} />:
                                    </Box>
                                    <TextField
                                        size="small"
                                        value={server}
                                        onChange={(e) => setServer(e.target.value)}
                                        select
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="Asia">Asia</MenuItem>
                                        <MenuItem value="European">European</MenuItem>
                                    </TextField>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "400px",
                                        marginBottom: "10px",
                                        marginLeft: "110px"
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={() => setAgreed(!agreed)}
                                        style={{ marginRight: "8px", width: "14px", height: "14px", }}
                                    />
                                    <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "700" }}>
                                        I agree to Thinkitive IoT Cloud's{" "}
                                        <Link
                                            href="#"
                                            color="primary"
                                            onClick={() => {
                                                console.log("Terms clicked");
                                            }}
                                        >
                                            Terms
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="#"
                                            color="primary"
                                            onClick={() => {
                                                console.log("Privacy Policy clicked");
                                            }}
                                        >
                                            privacy policy
                                        </Link>{" "}
                                        and to receive information about Thinkitive's products.
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 2,
                                        width: "100%",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ background: "57afe7" }}
                                        disabled={isNextButtonDisabled()}
                                    >
                                        Next &nbsp;{busy && <CircularProgress color="warning" size={16} />}
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                        {activeStep === 1 && (
                            <Grid item xs={12} md={6} sx={{ height: "430px" }}>
                                {gotOtp && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            m: 2,
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
                                            {`Verification code has been sent to "${email}"`}
                                        </Typography>
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: "24px",
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>Email Address:</Box>
                                    <TextField
                                        size="small"
                                        value={email}
                                        disabled
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "500px",
                                        marginBottom: "24px",
                                    }}
                                >
                                    <Box sx={{ mr: 1, width: "200px" }}>Verification Code:</Box>
                                    <TextField
                                        size="small"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{ maxLength: 6 }}
                                        error={!!verficationCodeError}
                                        helperText={verficationCodeError}
                                        onBlur={validateVerificationCode}
                                    />
                                    <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                                        Resend
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 2,
                                        width: "100%",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handliSubmit}
                                        sx={{ background: "57afe7" }}
                                        disabled={isSubmitButtonDisabled()}
                                    >
                                        Submit &nbsp;{busy && <CircularProgress color="warning" size={16} />}
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                        {activeStep === 2 && (
                            <Grid item xs={12} md={6} sx={{ height: "430px" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width: "100%",
                                        margin: "20px",
                                    }}
                                >
                                    <Typography sx={{ padding: "10px", fontSize: 24, fontWeight: 600 }}>
                                        Registerd Successfully!
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 2,
                                        width: "100%",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={() => (navigate("/"), handleReset())}
                                        sx={{ background: "#57afe7" }}
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

export default NewRegister;
