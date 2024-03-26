import { Delete } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SxProps, TextField, useTheme } from "@mui/material"
import { MutableRefObject } from "react";
import { Control, Controller, FieldValues, SubmitHandler, set, useFieldArray, useForm } from "react-hook-form";
import { useOutletContext, useSearchParams } from "react-router-dom";
import {v4} from 'uuid'
import { errorMessage } from "../../common/errors";
import { FormErrorHelperText } from "./FormErrorHelperText";
import { FilterKey, FilterOperation, FilterParam, KEY, OPERATION } from "../../common/types/filter.types";
import { filterArrayToParamString, flattenTimeToSeconds } from "../../common/utils";



type FilterFormValue = {
    filters: FilterParam[]
}

type SelectListItem<T> = {
    label: string,
    value: T,
    selected?: boolean
}

const keyFilterItems: SelectListItem<FilterKey>[] = [
    {
        label: "ID",
        value: KEY.ID,
        selected: true
    },
    {
        label: "Title",
        value: KEY.TITLE,
    },
    {
        label: "Duration",
        value: KEY.DURATION,
    },
    {
        label: "Release Date",
        value: KEY.RELEASE_DATE,
    },
    {
        label: "Attributed Artists",
        value: KEY.ATTRIBUTED_ARTIST,
    },
    {
        label: "Attributed Albums",
        value: KEY.ATTRIBUTED_ALBUM,
    },
    {
        label: "Genres",
        value: KEY.GENRE,
    }
]

const lessThanGreaterThanOps: SelectListItem<FilterOperation>[] = [
    {
        label: "Less Than",
        value: OPERATION.LT,
    },
    {
        label: "Less Than Or Equal To",
        value: OPERATION.LTE,
    },
    {
        label: "Greater Than",
        value: OPERATION.GT,
    },
    {
        label: "Greater Than Or Equal to",
        value: OPERATION.GTE,
    },
]

const operations: Record<FilterKey, SelectListItem<FilterOperation>[]> = {
    id: [
        ...lessThanGreaterThanOps,
        {
            label: "Equal to",
            value: OPERATION.EQ,
        }
    ],
    title: [
        {
            label: "Equal to",
            value: OPERATION.EQ,
            selected: true
        }
    ],
    duration: [
        ...lessThanGreaterThanOps,
        {
            label: "Equal to",
            value: OPERATION.EQ,
        }   
    ],
    releaseDate: [
        ...lessThanGreaterThanOps,
        {
            label: "Equal to",
            value: OPERATION.EQ,
        }
    ],
    artist: [
        {
            label: "Equal to",
            value: OPERATION.EQ,
            selected: true
        }
    ],
    album: [
        {
            label: "Equal to",
            value: OPERATION.EQ,
            selected: true
        }
    ],
    genre: [
        {
            label: "Equal to",
            value: OPERATION.EQ,
            selected: true
        }
    ],
}

type FilterSelectionProps = {
    id: string,
    label: string,
    listItems: SelectListItem<FilterKey | FilterOperation>[],
    register: Function,
    disabled?: boolean,
    control: any,
    sx?: SxProps
}

function FilterSelection({ id, 
    label, 
    register, 
    listItems, 
    disabled, 
    control, 
    sx
}: FilterSelectionProps) {

    const renderListItems = () => listItems.map((
        { label, value, selected }
    ) => <MenuItem selected={selected} key={v4()} value={value}>{label}</MenuItem>)

    return (
        <Controller
            {...register()}
            ref={null}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) =>{
                return (
                    <FormControl sx={{ flex: 1, ...sx }}>
                        <InputLabel id={`${id}-select-small-label`}>{label}</InputLabel>
                        <Select
                            ref={null}
                            inputProps={{ ...register }}
                            MenuProps={{
                                style: {
                                    maxHeight: "500px"
                                }
                            }}
                            labelId={`${id}-select-small-label`}
                            id={`${id}-select-small`}
                            value={value}
                            label={label}
                            onChange={onChange}
                            disabled={disabled}
                        >
                            {renderListItems()}
                        </Select>
                    </FormControl>
                )
            }}
        />

    )

}

export const FilterForm = () => {

    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();

    const { drawerRef } = useOutletContext<{
        drawerRef: MutableRefObject<HTMLDivElement | null>
    }>();

    const { control, formState: { errors }, register, handleSubmit, getValues, watch } = useForm<FilterFormValue>();

    const { fields, append, remove } = useFieldArray<FilterFormValue>({
        name: "filters",
        control,
        rules: {
            required: true,
        }
    })

    const addFilterHandler = () => {
        append({ key: 'id', operation: 'eq', value: ''})
    }

    const onSubmit: SubmitHandler<FilterFormValue> = (data: FilterFormValue) => {

        console.log({data})

        const validatedfilters = data.filters.map(({key, operation, value}) => {

            if(key === "duration"){

                const timeSplit = value.split(":");

                if (timeSplit.length === 1) {
                    value = `${flattenTimeToSeconds(0, 0, +timeSplit[0])}`
                }

                if (timeSplit.length === 2){
                    value = `${flattenTimeToSeconds(0, +timeSplit[0], +timeSplit[1])}`
                }

                if (timeSplit.length === 3) {
                    value = `${flattenTimeToSeconds(+timeSplit[0], +timeSplit[1], +timeSplit[2])}`
                }

            }

            return ({
                key,
                operation,
                value
            })

        })

        
        const filterString = filterArrayToParamString(validatedfilters)

        setSearchParams((prev) => {
            prev.delete("filter")
            prev.append("filter", filterString);
            return prev;
        })

    }

    const removeHandler = (index: number) => {

        const filterParams = searchParams.get("filter");


        const filterToDelete = getValues().filters[index];

        if (filterParams){
            const filterString = filterArrayToParamString([filterToDelete])

            const filterParamsArr = filterParams.split('~');

            const newParams = filterParamsArr.filter((param) => param !== filterString);


            setSearchParams((prev) => {
                prev.delete("filter");

                if (!newParams.length){
                    return prev;
                }

                prev.append("filter", newParams.join("~"))
                return prev;
            })
            
        }

        remove(index);
    }

    const renderFields = () => {

        const fieldsArr =  fields.map((field, index) => {

            const keyWatch = watch(`filters.${index}.key`);
            let filterErrorMessage = errors?.filters?.[index]?.value?.message;

            return (
                <Box key={v4()} sx={{


                    background: "#ebebeb85",
                    padding: "20px",
                    borderRadius: "5px",



                    display: "grid", 
                    gap:"20px",
                    gridTemplateAreas: `
                        "filterKey filterDeleteBtn"
                        "filterOperation filterDeleteBtn"
                        "filterValue filterDeleteBtn"
                    `,
                    gridTemplateColumns: "1fr auto",
                    [theme.breakpoints.up('sm')]: {
                        gridTemplateAreas: `
                            "filterKey filterOperation filterValue filterDeleteBtn"
                        `,
                        gridTemplateColumns: "1fr 1fr 1fr auto"
                    },
                    [theme.breakpoints.up('md')]: {
                        gridTemplateAreas: `
                            "filterKey filterDeleteBtn"
                            "filterOperation filterDeleteBtn"
                            "filterValue filterDeleteBtn"
                        `,
                        gridTemplateColumns: "1fr auto",
                    },
                }}>
                    <FilterSelection {...{
                        sx:{
                            gridArea:"filterKey"
                        },
                        id: "column", 
                        label:"Column", 
                        listItems: keyFilterItems, 
                        register:  () => register(`filters.${index}.key`) ,
                        control
                    }}/>
                    <FilterSelection {...{
                        sx: {
                            gridArea: "filterOperation"
                        },
                        id: "operation",
                        label: "Operation",
                        listItems: operations[keyWatch] || [],
                        register: () => register(`filters.${index}.operation`),
                        control,
                    }} />
                    <FormControl
                        sx={{
                            gridArea: "filterValue"
                        }}
                    >
                        <TextField
                            error={!!filterErrorMessage}
                            {...register(`filters.${index}.value`, {
                                required: {
                                    value: true,
                                    message: errorMessage.required,
                                }
                            })} label="Value To Filter By" variant="standard" />
                        <FormErrorHelperText errorMessage={filterErrorMessage} />
                    </FormControl>
                    <Box sx={{
                        display:"flex",
                        alignItems:"center",
                        gridArea: "filterDeleteBtn"
                    }}>
                        <IconButton
                            onClick={() => removeHandler(index)}
                            sx={{ color: theme.palette.error.dark }}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
            )

        })

        if (fieldsArr.length){
            fieldsArr.push(<Button key={v4()} type="submit" variant="outlined">Submit</Button>)
        }

        return fieldsArr

    }

    return (
        <Box sx={{ 
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            maxWidth: "800px",
            gridArea: "filter"
        }}>
            <Button onClick={addFilterHandler} variant="contained">Add Filter</Button>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
                    padding: fields.length ? "20px" : "unset",
                    borderRadius: "0px 0px 5px 5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    overflow: "scroll",
                    maxHeight: "300px",
                    [theme.breakpoints.up('md')]: {
                        maxHeight: `calc(100vh - 40px - 47px - ${drawerRef?.current ? drawerRef?.current?.clientHeight : 0}px)`,
                    }
                }}>

                    {renderFields()}
                </Box>
            </form>
        </Box>
    )

}