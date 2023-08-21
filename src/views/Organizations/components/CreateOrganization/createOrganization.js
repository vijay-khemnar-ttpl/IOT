import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Box, TextField } from '@mui/material';

import { useDataSourceForOrganizations } from '../../../../service/Organizations';

export const CreateOrganization = () => {
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState('');
    const [orgNameError, setOrgNameError] = useState('');
    const { create_Organization } = useDataSourceForOrganizations();

    const handleCreate = async () => {
        validateOrgName();
        if (orgName) {
            try {
                const response = await create_Organization(orgName);
                console.log('response create org', response);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error creating organization:', error);
            }
        }
    };

    const validateOrgName = () => {
        if (!orgName) {
            setOrgNameError("This is a required field.");
            return false;
        }
        setOrgNameError('');
        return true;
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '90vh',
            }}
        >
            <Box sx={{ padding: 2, width: '600px' }}>
                <h2>Create Organization</h2>
                <p>To create a new organization, please enter your organization name here.</p>
                <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginRight: 1 }}>
                        <label htmlFor="orgName">Organization Name:</label>
                    </Box>
                    <TextField
                        id="orgName"
                        size="small"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        onBlur={validateOrgName}
                        error={!!orgNameError}
                        helperText={orgNameError}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="primary" sx={{ marginRight: 2 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </Box>
            </Box>
        </div>
    );
};
