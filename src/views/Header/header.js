import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, AppBar, Toolbar, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logoImg from '../../assets/images/logoImg.png';

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    console.log("1234567890", menuOpen);

    useEffect(() => {
        const storedUsername = localStorage.getItem('user_name');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [localStorage.getItem('user_name')]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUsername('');
        navigate('/');
        setMenuOpen(false);
    };

    return (
        <AppBar position="sticky" style={{ top: 0 }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                    src={logoImg}
                    onClick={() => navigate('/')}
                    alt="Logo"
                    style={{ height: '35px', cursor: 'pointer' }}
                />
                {username && (
                    <Box
                        onMouseEnter={handleMenuOpen}
                        onMouseLeave={handleMenuClose}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>{username}</Typography>
                        <ExpandMoreIcon />
                        <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
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
                            <MenuItem>Language</MenuItem>
                            <MenuItem onClick={() => { navigate('/user_profile') }}>Me</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        <AccountCircleIcon />
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
