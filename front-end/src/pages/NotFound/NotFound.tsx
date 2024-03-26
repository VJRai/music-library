import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { MutableRefObject } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export const NotFound = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { drawerRef } = useOutletContext<{
        drawerRef: MutableRefObject<HTMLDivElement | null>
    }>();

    const onClickHandler = () => {
        navigate('/')
    }


    return (
        <Container sx={{
            padding: "20px",
            textAlign:'center',
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            height: `calc(100vh - 40px - ${drawerRef?.current ? drawerRef?.current?.clientHeight : 0}px)`,
        }}>
            <Box
                sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <Typography 
                    color="primary"
                    sx={{ 
                        fontWeight: 'bold', 
                        fontSize:"10rem"
                    }} 
                    variant="h1">404
                </Typography>

            </Box>
            
            <Typography
                color="primary"
                sx={{
                    fontWeight:'bold', 
                }}
                variant="h5"
            >
                    Oops... It seems the resource you're looking for was not found.
            </Typography>

            <Box sx={{
                margin:"10px 0 30px 0"
            }}>
                <Typography
                    color={theme.palette.primary.light}
                    variant="caption"
                >
                    Not all who wonder are lost. However, in this case, it seems that you are.<br/>
                    Let me help you find your way.
                </Typography>
            </Box>


            <Box>
                <Button 
                    onClick={onClickHandler}
                sx={{
                    fontWeight:"bold"
                }} 
                variant="outlined"
                >
                    HEAD BACK TO THE DASHBOARD
                </Button>
            </Box>

        </Container>
    )
}