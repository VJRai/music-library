import { FormHelperText as MUIFormHelperText, useTheme } from "@mui/material";

export const FormErrorHelperText = ({ errorMessage = null }: { errorMessage?: string | null}) => {

    const theme = useTheme()

    return <MUIFormHelperText sx={{ 
        color: theme.palette.error.dark ,
        marginLeft:0
    }}>{errorMessage}</MUIFormHelperText>;
}