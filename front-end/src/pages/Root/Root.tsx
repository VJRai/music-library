import { Box, CssBaseline } from "@mui/material"
import { useRef, useState } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { DrawerHeader } from "../../components/DrawerHeader/Drawer";
import { Outlet } from "react-router-dom";


export const Root = () => {

    const title = "My Music Library";

    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(!open)
    }

    const drawerRef = useRef<HTMLDivElement | null>(null)


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <AppBar {...{ open, handleToggleOpen, title }} />
            <Box component="main" style={{width:"100%"}}>
                <DrawerHeader ref={drawerRef} />
                <Outlet context={{
                    drawerRef
                }}/>
            </Box>
        </Box>
    )
}