import { Box, Chip } from "@mui/material"
import { MetaData } from "../../common/types/song.types"

export function Tags<T extends MetaData>(list: T[], icon: JSX.Element) {

    const renderTags = () => list.map((list: T, index) => (
        <Box
            key={index}
            sx={{
                maxWidth: "250px",
                display: 'block',
                overflow: "hidden"
            }}
        >
            <Chip icon={icon} label={list.name} />
        </Box>
    ))

    return (
        <Box sx={{
            display: "grid",
            gridAutoRows: "max-content",
            gridGap: "10px",
        }}>
            {renderTags()}
        </Box>
    )

}