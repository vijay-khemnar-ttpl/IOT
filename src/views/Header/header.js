import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logoImg from '../../assets/images/logoImg.png';
import mapLogo from '../../assets/images/mapLogo.png';

const languages = ['English', 'Spanish', 'French', 'German'];

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (language) => () => {
        setSelectedLanguage(language);
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" style={{ top: 0 }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                    src={logoImg}
                    onClick={() => navigate("/")}
                    alt="Logo"
                    style={{ height: '35px', marginRight: '16px', cursor: 'pointer' }}
                />
                <Box
                    onMouseEnter={handleMenuOpen}
                    onMouseLeave={handleMenuClose}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={mapLogo}
                        alt="Logo"
                        style={{ height: '35px', marginRight: '16px', cursor: 'pointer' }}
                    />
                    <Typography>{selectedLanguage}</Typography>
                    <ExpandMoreIcon />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {languages.map((language, index) => (
                            <MenuItem key={index} onClick={handleLanguageSelect(language)}>
                                {language}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
