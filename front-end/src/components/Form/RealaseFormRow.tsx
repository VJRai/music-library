import { Box, FormLabel, IconButton, TextField, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Controller, FieldErrors, useFieldArray } from "react-hook-form";
import { FormValue } from "../../common/types/form.type";
import { FormErrorHelperText } from "./FormErrorHelperText";
import { errorMessage } from "../../common/errors";
import { Add, Delete } from "@mui/icons-material";


type ReleaseInType = "single" | "album";


export const ReleaseFormRow = ({ 
    control, 
    registerDate, 
    registerReleasedAs,
    register,
    errors
}: { 
    control: any, 
    registerDate: any, 
    registerReleasedAs:any,
    register: any,
    errors: FieldErrors<FormValue>
}) => {

    const theme = useTheme();

    const [releaseInType, setReleaseType] = useState<ReleaseInType>("single");

    const {
        fields: albumFields,
        append: albumAppend,
        remove: albumRemove,
    } = useFieldArray({ control, name: "albums" });


    const renderAlbumFields = () => {

        if (releaseInType !== "album"){
            return;
        }

        return albumFields.map((field, index) => {

            let nameErrorMessage = errors?.albums?.[index]?.albumName?.message;

            if(index === 0){
                return (
                    <Box key={field.id} sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 0fr",
                        gridGap: "10px"
                    }}>
                        <Box>
                            <TextField 
                                error={!!nameErrorMessage} 
                                
                                {...register(`albums.${index}.albumName`, {
                                    required: {
                                        value: true,
                                        message: errorMessage.required,
                                    }
                                })} 
                                label="Album Title" 
                                variant="standard" 
                                sx={{ width: '100%' }} 
                            />
                        </Box>
                        <Box>
                            <TextField
                                {...register(`albums.${index}.trackNumber`, {
                                    required: {
                                        value: true,
                                        message: errorMessage.required,
                                    }
                                })}
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                defaultValue={1}
                                type='number'
                                label="Track Number"
                                variant="standard"
                                sx={{ width: '100%' }}
                            />
                        </Box>
                        <IconButton onClick={() => albumAppend({ albumName: ''})} sx={{ color: theme.palette.primary.main }}>
                            <Add />
                        </IconButton>
                    </Box>
                )
            }
            return (
                <Box key={field.id} sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 0fr",
                    gridGap: "10px"
                }}>
                    <Box>
                        <TextField
                            error={!!nameErrorMessage}

                            {...register(`albums.${index}.albumName`, {
                                required: {
                                    value: true,
                                    message: errorMessage.required,
                                }
                            })}
                            label="Album Title"
                            variant="standard"
                            sx={{ width: '100%' }}
                        />
                        <FormErrorHelperText errorMessage={nameErrorMessage} />
                    </Box>
                    <Box>
                        <TextField
                            error={!!nameErrorMessage}
                            {...register(`albums.${index}.trackNumber`, {
                                required: {
                                    value: true,
                                    message: errorMessage.required,
                                }
                            })}
                            InputProps={{
                                inputProps: { min: 1 }
                            }}
                            defaultValue={1}
                            type='number'
                            label="Track Number"
                            variant="standard"
                            sx={{ width: '100%' }}
                        />
                    </Box>
                    <IconButton
                        onClick={() => albumRemove(index)}
                        sx={{ color: theme.palette.error.dark }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            )

        })

    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridGap: "10px",
            alignItems: 'flex-end'
        }}>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gridGap: "10px",
                alignItems: 'flex-end'
            }}>
                <FormLabel>
                    Release Date:
                </FormLabel>
                <Controller
                    {...registerDate}
                    ref={null}
                    control={control}
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) =>
                        <DatePicker
                            onChange={(selectedOptions) => {
                                onChange(selectedOptions);
                            }}
                            slotProps={{ 
                                textField: { 
                                    size: 'small', 
                                    helperText: errors?.releaseDate?.message,
                                    color: 'error'
                                }
                            }}
                        />
                    }
                /> 
            </Box>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gridGap: "10px",
                alignItems: 'flex-end'
            }}>
                <FormLabel>
                    Released As:
                </FormLabel>


                <Controller
                    {...registerReleasedAs}
                    ref={null}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) =>
                        <ToggleButtonGroup
                            size="small"
                            color="primary"
                            value={value}
                            exclusive
                            aria-label="Platform"
                            onChange={(event, selectedOptions) => {
                                if (!selectedOptions) return;
                                onChange(selectedOptions);
                                setReleaseType(selectedOptions)
                            }}
                        >
                            <ToggleButton value="single">Single</ToggleButton>
                            <ToggleButton value="album">Part Of Album</ToggleButton>
                        </ToggleButtonGroup>
                    }
                />
            </Box>
            {renderAlbumFields()}
        </Box>
    )
}