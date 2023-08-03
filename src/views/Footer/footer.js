import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterText = styled(Typography)(({ theme }) => ({
  color: '#fff',
  display: 'flex',
  position: 'relative',
  padding: '12px 40px 12px 0px',
  cursor: 'pointer',
  fontSize: '17px',
  '&:hover': {
    color: '#2283bf', // Blue color on hover
    textDecoration: 'underline', // Underline on hover
  },
}));

const FooterSubText = styled(Typography)(({ theme }) => ({
  color: '#fff',
  cursor: 'pointer',
  '&:hover': {
    color: '#2283bf', // Blue color on hover
    textDecoration: 'underline', // Underline on hover
  },
}));

const FooterDivider = styled(Divider)({
  height: 16,
  margin: '0 6px',
  background: 'white',
});

export const Footer = () => {
  return (
    <Paper style={{ background: 'black', position: 'fixed', bottom: 0, width: '100%', height: 110, borderRadius: 0 }}>
      <Box display="flex" justifyContent="flex-start" padding="5px 100px">
        <FooterText>About Us</FooterText>
        <FooterText>Contact Us</FooterText>
        <FooterText>Products</FooterText>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" padding="0px 100px">
        <FooterSubText variant="subtitle2">Cookie</FooterSubText>
        <FooterDivider orientation="vertical" />
        <FooterSubText variant="subtitle2">Privacy Policy</FooterSubText>
        <FooterDivider orientation="vertical" />
        <FooterSubText variant="subtitle2">Terms of Use</FooterSubText>
        <FooterDivider orientation="vertical" />
        <FooterSubText variant="subtitle2">Subscribe</FooterSubText>
      </Box>
    </Paper>
  );
};
