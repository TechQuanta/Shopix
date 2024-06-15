import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function Loader({ onClick, loading, title }) {

    const buttonSx = {
        ...(loading && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ m: 1, position: 'relative', width: '100%' }}>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={onClick}
                >
                    {title}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}