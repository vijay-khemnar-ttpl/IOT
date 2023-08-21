import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material'

export const Sites = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/create_site');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                position: 'relative',
            }}
        >
            <Button
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                }}
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
            >
                Create Site
            </Button>
            This is the sites page !!
        </Box>
    )
}
