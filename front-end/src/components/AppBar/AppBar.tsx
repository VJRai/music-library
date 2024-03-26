import { MouseEventHandler } from "react";
import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Box, CssBaseline, Toolbar, Typography, styled } from "@mui/material"

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBarComponent = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

export const AppBar = ({ open, handleToggleOpen, title }: { open: boolean, handleToggleOpen: MouseEventHandler<HTMLButtonElement>, title:string }) => {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <AppBarComponent position="fixed" open={open}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBarComponent>
        </Box>
    )
}