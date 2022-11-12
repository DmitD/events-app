import React from 'react';
import {Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type InputProps = {
    name: string;
    label: string;
    type?: string;
    half?: boolean;
    autoFocus?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShowPassword?: () => void
}

const Input: React.FC<InputProps> = ({name, label, half, autoFocus, handleChange, type, handleShowPassword}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : undefined}
            />
        </Grid>
    );
};

export default Input;