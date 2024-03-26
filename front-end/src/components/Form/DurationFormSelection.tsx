import {  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import {  UseFormRegisterReturn } from "react-hook-form"

type DurationFormSelectionProps = {
    label: string,
    id: string,
    maxValue: number,
    register: UseFormRegisterReturn<string>,
    error?: string
}

export const DurationFormSelection = ({ label, id, maxValue, register, error }: DurationFormSelectionProps) => {

    const [value, setValue] = useState<string>(`${0}`);

    const renderMenuItems = () => {

        return Array.from({ length: maxValue+1 }, (_, i) => i).map((i) => (
            <MenuItem key={i} value={i}>{i}</MenuItem>
        ))

    }

    const changeHandler = (e: SelectChangeEvent<string>) => {
        setValue(e.target.value)
    }

    return (
        <FormControl sx={{ marginTop: "10px", minWidth: 120 }} size="small">
            <InputLabel id={`${id}-duration-select-small-label`}>{label}</InputLabel>
            <Select
                inputProps={{...register}}
                MenuProps={{
                    style:{
                        maxHeight:"500px"
                    }
                }}
                error={!!error}
                labelId={`${id}-duration-select-small-label`}
                id={`${id}-duration-select-small`}
                value={value}
                label={label}
                onChange={changeHandler}
            >
                {renderMenuItems()}
              
            </Select>
        </FormControl>
    )

}