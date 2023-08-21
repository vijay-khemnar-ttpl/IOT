import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Grid, Box, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from 'formik';
import * as yup from 'yup';

import cityImg from '../../assets/images/city.png';
import earthCloudImg from '../../assets/images/earthCloud.png';
import connectorsImg from '../../assets/images/connectors.png';
import { useDataSources } from '../../service/UserRegistration';

const validationSchema = yup.object({
  email: yup.string().required("This is a required field.").email("Please enter a valid email address."),
  password: yup.string().required("This is a required field."),
});
const initialValues = {
  email: '',
  password: '',
};

const MyForm = React.memo(() => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { getLogin, error, errorMessage } = useDataSources();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setBusy(true);
        const response = await getLogin(values.email, values.password);
        console.log("response while login", response);
      } catch (errors) {
        console.log('Error:', errors.response.data.message);
      } finally {
        setBusy(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ padding: '10px 0px 15px 0px' }}>
        <Typography sx={{ fontSize: '15px' }}>Email Address:</Typography>
        <TextField
          size="small"
          fullWidth
          name="email"
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>
      <Box sx={{ padding: '10px 0px 10px 0px' }}>
        <Typography sx={{ fontSize: '15px' }}>Password:</Typography>
        <TextField
          size="small"
          fullWidth
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          type={showPassword ? "text" : "password"}
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
      {error && (
        <Box style={{ display: "flex", justifyContent: "center", border: '1px solid red', backgroundColor: '#F3E8EA' }}>
          <Typography sx={{ fontSize: "15px", color: "red", padding: '2px' }}>
            ! {errorMessage}
          </Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end">
        <Typography
          sx={{ textAlign: 'end', color: '#57afe7', cursor: 'pointer' }}
          onClick={() => navigate('/forgot')}
        >
          Forget Password?
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ my: 2, color: '#2283bf' }}>
        <Button variant="contained" type="submit" fullWidth sx={{ height: '38px' }}>
          Login &nbsp;{busy && <CircularProgress color="warning" size={16} />}
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Typography>Not registered yet? </Typography>
        <Typography
          sx={{ marginLeft: '5px', color: '#57afe7', cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Register Now
        </Typography>
      </Box>
    </form>
  );
});

const LoginPage = () => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(`(max-width: 850px)`);

  return (
    <Box
      className="container"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${cityImg})`,
        backgroundColor: '#2A304C',
        padding: '0px 50px 80px 50px',
      }}
    >
      {!isScreenSmall && (
        <Box
          style={{
            flex: 1,
            position: 'relative',
            backgroundImage: `url(${connectorsImg})`,
            backgroundSize: 'cover',
            opacity: 0.2,
            zIndex: 0,
          }}
          id="image-box"
        />
      )}

      <Grid container spacing={0} justifyContent="center" alignItems="center" style={{ flex: 1 }}>
        {isScreenSmall ? (
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card className="mobileSizeCard">
              <CardContent>
                <Typography
                  variant="h4"
                  align="start"
                  sx={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#2283bf',
                    padding: '10px 0px 20px',
                  }}
                >
                  Login with Password
                </Typography>
                <MyForm />
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <>
            <Grid item xs={7} style={{ textAlign: 'center', position: 'relative' }}>
              <img
                src={earthCloudImg}
                alt="Logo"
                style={{ height: '100%', width: '60%', objectFit: 'contain' }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '48%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                  fontSize: '2.5vw',
                  height: '122px',
                  width: '100%',
                  lineHeight: '98px',
                }}
              >
                Thinkitive IoT Cloud
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Card
                style={{
                  maxWidth: 400,
                  padding: '20px 40px',
                  borderRadius: 10,
                  minWidth: 300,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    align="start"
                    sx={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: '#2283bf',
                      padding: '10px 0px 20px',
                    }}
                  >
                    Login with Password
                  </Typography>
                  <MyForm />
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LoginPage;
