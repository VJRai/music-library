
import { Box, Fab, Modal, useTheme } from "@mui/material"
import { SongTable } from "../../components/Table/SongTable";
import { FilterForm } from "../../components/Form/FilterForm";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Form } from "../../components/Form/Form";


const AddListingModal = ({ 
    isOpen, 
    handleClose, }: { 
        isOpen: boolean, 
        handleClose: any,
    }) => {
    return (
        <Modal
            ref={null}
            sx={{
                alignItems:'center',
                justifyContent:'center',
                display:"flex",
            }}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Form submitted={handleClose}/>
        </Modal>
    )
}


export const Dashboard = () => {

    const theme = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };


    return  (
        <Box sx={{
            position: "relative",
            padding:"20px", 
            width:"100%", 
            display:"grid",
            gridTemplateAreas: `
                    "filter"
                    "table"
            `,
            gap:"20px",
            maxWidth: "1800px",
            margin: "0 auto",
            [theme.breakpoints.up('md')]: {
                gridTemplateAreas: `
                    "table filter"
                `
            },
        }}>
            <SongTable/>
            <FilterForm/>
            <Fab 
                onClick={handleOpen} 
                sx={{
                    position:"absolute",
                    bottom:"40px",
                    right:"40px",
                    [theme.breakpoints.down('md')]: {
                        bottom:"100px"
                    },
                    
                }}
                color="primary" 
                aria-label="add"
            >
                <Add/>
            </Fab>
            <AddListingModal 
                isOpen={isModalOpen}
                handleClose={handleClose}
            />
        </Box>
    )

}