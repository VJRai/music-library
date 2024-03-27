import { Delete } from "@mui/icons-material";
import { Box, FormControl, IconButton, TextField, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material"
import { Controller } from "react-hook-form";
import { FormErrorHelperText } from "./FormErrorHelperText";


export const ArtistFormRow = ({ 
    control, artistRegister, creditRegister, deleteHandler, errorMessage = null
}: { control: any, artistRegister: any, creditRegister: any, deleteHandler: any, errorMessage?: string | null}) => {

    const theme = useTheme();

    return(
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr 0fr 0fr",
            gap: "20px"
        }} >
            <FormControl>
                <TextField ref={null} error={!!errorMessage} {...artistRegister} label="Artist" variant="standard" sx={{ maxWidth: "400px" }} />
                <FormErrorHelperText errorMessage={errorMessage} />
            </FormControl>

            <Controller
                {...creditRegister}
                ref={null}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) =>
                    <ToggleButtonGroup
                        ref={null}
                        value={value}
                        onChange={(event, selectedOptions) => {
                            onChange(selectedOptions);
                        }}
                        color="primary"
                        exclusive
                        aria-label="Platform"
                    >
                        <ToggleButton value="PRIMARY">Primary</ToggleButton>
                        <ToggleButton value="FEATURED">Featured</ToggleButton>
                    </ToggleButtonGroup>
                }
            />

            <IconButton
                onClick={deleteHandler}
                sx={{ color: theme.palette.error.dark }}
            >
                <Delete />
            </IconButton>
        </Box >
    )
}