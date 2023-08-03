import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

export const PasswordStrengthTooltip = ({ password, validatePassword }) => {
    const passwordInstructions = [
        { text: "Password must contain a upper case letter", check: () => /[A-Z]/.test(password) },
        { text: "Password must contain a lower case letter", check: () => /[a-z]/.test(password) },
        { text: "Password must contain a number", check: () => /\d/.test(password) },
        { text: "Password must contain at least 8 characters", check: () => password.length >= 8 },
    ];

    return (
        <Tooltip
            open={password !== "" && !validatePassword()}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                >
                    {passwordInstructions.map((instruction, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                            {instruction.check() ? (
                                <Box sx={{ color: "green", marginRight: "8px" }}>✓</Box>
                            ) : (
                                <Box sx={{ color: "red", marginRight: "8px" }}>✕</Box>
                            )}
                            <Typography variant="body2" sx={{ color: "black" }}>{instruction.text}</Typography>
                        </Box>
                    ))}
                </Box>
            }
            placement="right-start"
        >
        </Tooltip>
    );
};