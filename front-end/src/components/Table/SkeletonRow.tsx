import { Box, Skeleton, TableCell, TableRow } from "@mui/material"
import {v4} from 'uuid';

export const SkeletonRow = () => {

    function getRandomNumber(min: number, max:number) {
        return Math.random() * (max - min) + min;
    }

    const randomArtistCount = getRandomNumber(1, 3);
    const randomAlbumCount = getRandomNumber(1, 3);
    const randomGenreCount = getRandomNumber(1, 3);

    const renderRandomArtists = () => {
        return Array.from(Array(Math.ceil(randomArtistCount)).keys()).map(() => {
            return <Skeleton key={v4()} variant="text" sx={{ fontSize: `${getRandomNumber(1,2).toFixed(1)}rem`, width: '100%' }} />
        })
    }

    const renderRandomAlbums = () => {
        return Array.from(Array(Math.ceil(randomAlbumCount)).keys()).map(() => {
            return <Skeleton key={v4()} variant="text" sx={{ fontSize: `${getRandomNumber(1, 2).toFixed(1)}rem`, width: '100%' }} />
        })
    }

    const renderRandomGenres = () => {
        return Array.from(Array(Math.ceil(randomGenreCount)).keys()).map(() => {
            return <Skeleton key={v4()} variant="rounded" sx={{ width: `${getRandomNumber(50, 80).toFixed(1)}%` }} />
        })
    }


    return (
        <TableRow sx={{
            display: "grid",
            gridTemplateColumns: "75px 150px 75px 150px 250px 150px 150px",
            gridAutoRows: "min-content"
        }}>

            <TableCell
                style={{
                    display: 'flex',
                    width: '75px',
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                </Box>
            </TableCell>

            <TableCell
                style={{
                    display: 'flex',
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="rectangular" height={Math.ceil(getRandomNumber(20, 75))} />
                </Box>
            </TableCell>

            <TableCell
                style={{
                    display: 'flex',
                    width: "100%"
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                </Box>

            </TableCell>

            <TableCell
                style={{
                    display: 'flex',
                }}
            >

                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                </Box>

            </TableCell>

            <TableCell
                style={{
                    display: 'flex',
                }}
            >

                <Box sx={{ flex: 1 }}>
                    {renderRandomArtists()}
                </Box>

            </TableCell>

            <TableCell
                style={{
                    display: 'flex',
                }}
            >

                <Box sx={{ flex: 1, display: "grid", gridGap: "10px" }}>
                    {renderRandomAlbums()}
                </Box>

            </TableCell>

            <TableCell
                style={{
                    display: 'flex',
                }}
            >

                <Box sx={{ flex: 1, display: "grid", gridGap: "10px" }}>
                    {renderRandomGenres()}
                </Box>

            </TableCell>

        </TableRow>
    )
}