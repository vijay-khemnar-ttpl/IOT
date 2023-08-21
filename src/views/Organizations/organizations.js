import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Organizations = () => {
    const navigate = useNavigate();

    const [organizations, setOrganizations] = useState([
        { id: 1, name: 'Org 1', members: 10 },
        { id: 2, name: 'Org 2', members: 15 },
    ]);

    const handleEditClick = () => {
    };

    const handleDeleteClick = () => {
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '80vh',
                position: 'relative',
                overflowY: 'hidden',
                padding: 5
            }}
        >
            <Box sx={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Organization Name</TableCell>
                            <TableCell align="center" sx={{ borderBottom: '1px solid #ccc' }}>Organization Members</TableCell>
                            <TableCell align="center" sx={{ borderBottom: '1px solid #ccc' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizations.map((org) => (
                            <TableRow key={org.id} sx={{ borderBottom: '1px solid #ccc' }}>
                                <TableCell>{org.name}</TableCell>
                                <TableCell align="center">{org.members}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="primary" onClick={handleEditClick} sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleDeleteClick}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};
