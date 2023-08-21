import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDataSources } from '../../service/UserRegistration';

export const UserProfile = () => {
    const [userDetails, setUserDetails] = useState('');
    const [busy, setBusy] = useState(false);
    const { getUserDetails } = useDataSources();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        textAlign: 'center'
    };

    const cardBoxStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '700px',
        width: '90%'
    };

    const avatarStyle = {
        width: '100px',
        height: '100px',
        marginBottom: '10px',
        alignItems: 'center'
    };

    const avatarContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    };

    const userDetailsStyle = {
        marginTop: '20px',
        width: '100%'
    };

    const get_UserDetail = async () => {
        try {
            setBusy(true);
            const response = await getUserDetails();
            setUserDetails(response.message[0])
            console.log("response while getting user deatils", response.message[0]);
        } catch (errors) {
            console.log('Error:', errors.response.data.message);
        } finally {
            setBusy(false);
        }
    };

    useEffect(() => {
        get_UserDetail();
    }, [])


    return (
        <Box style={containerStyle}>
            <Typography sx={{ fontSize: 24, fontWeight: 500, margin: 2 }}>About Me</Typography>
            <Box style={cardBoxStyle}>
                <Box style={avatarContainerStyle}>
                    <Avatar alt="User Profile" src="" sx={avatarStyle} />
                </Box>
                <Box style={userDetailsStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Email" fullWidth variant="outlined" value={userDetails.email || ''} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="First Name" fullWidth variant="outlined" value={userDetails.first_name || ''} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Last Name" fullWidth variant="outlined" value={userDetails.last_name || ''} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Server" fullWidth variant="outlined" value={userDetails.server || ''} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};
