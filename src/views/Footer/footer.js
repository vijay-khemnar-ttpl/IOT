import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterDivider = styled(Divider)({
  height: 16,
  margin: '0 6px',
  background: 'white',
});

export const Footer = () => {
  return (
    <Paper className='footer-bar' style={{ background: 'black', position: 'fixed', bottom: 0, width: '100%', height: 110, borderRadius: 0 }}>
      <Box className="footer-bar-firstcontainer" display="flex" justifyContent="flex-start" padding="5px 100px">
        <Typography className='footer-bar-maintext'>About Us</Typography>
        <Typography className='footer-bar-maintext'>Contact Us</Typography>
        <Typography className='footer-bar-maintext'>Products</Typography>
      </Box>
      <Box className="footer-bar-secondcontainer" display="flex" alignItems="center" justifyContent="flex-start" padding="0px 100px">
        <Typography className='footer-bar-subtext' variant="subtitle2">Cookie</Typography>
        <FooterDivider orientation="vertical" />
        <Typography className='footer-bar-subtext' variant="subtitle2">Privacy Policy</Typography>
        <FooterDivider orientation="vertical" />
        <Typography className='footer-bar-subtext' variant="subtitle2">Terms of Use</Typography>
        <FooterDivider orientation="vertical" />
        <Typography className='footer-bar-subtext' variant="subtitle2">Subscribe</Typography>
      </Box>
    </Paper>
  );
};
