import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Paper, Skeleton, Typography, useTheme } from "@mui/material"
import { v4 } from 'uuid'
import { useGetSong } from "../../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { Album, ArrowBack, ExpandMore, More, MusicNote, RecordVoiceOverOutlined } from "@mui/icons-material";
import { MetaData, SongDTO } from "../../common/types/song.types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { secondsToSecondsMinutesHours } from "../../common/utils";
import { CSSStyles } from "../../common/types/style.type";


const styles: CSSStyles = {

    container: {
        padding: "20px",
        width: "100%",
        display: "grid",
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        gridTemplateAreas: `
            "backBtn backBtn"
            "songInfo songInfo"
        `,
    },
    card: {
        gridArea: "songInfo",
        padding: "20px",
        display: "grid",
        gridTemplateAreas: `
                    "image title"
                    "image title"
                    "divider1 divider1"
                    "details details"
                `,
        gridTemplateColumns: "auto 1fr",
        gap: "20px"
    },
    details: {
        gridArea: "details",
        display: "flex",
        flexDirection: "column",
        justifyContent:"flex-end"
    }

}

export const SkeletonSong = () => {

    return (
        <Paper data-testid="skeleton_ui" sx={{
            ...styles.card,
            id: "test_skeleton"
        }}>
            <Skeleton
                sx={{
                    gridArea: "image",
                }}
                variant="rectangular"
                height={100}
                width={100} />
            <Box sx={{
                gridArea: "title",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
            }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '5%' }} />
            </Box>

            <Divider sx={{
                gridArea: "divider1"
            }} />

            <Box sx={{
                display:'flex',
                flexDirection:"column",
                gap:"10px",
                gridArea:'details'
            }}>
                <Skeleton
                    sx={{
                        gridArea: "image",
                    }}
                    variant="rectangular"
                    height={30}
                    width="100%" />
                <Skeleton
                    sx={{
                        gridArea: "image",
                    }}
                    variant="rectangular"
                    height={30}
                    width="100%" />
                <Skeleton
                    sx={{
                        gridArea: "image",
                    }}
                    variant="rectangular"
                    height={30}
                    width="100%" />
            </Box>
        </Paper>
    )

}

export const LoadedSong = ({data}: {data: SongDTO}) => {

    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const render = (list: MetaData[], icon: JSX.Element) => {

        return list.map(({ name }) => {
            return (
                <Box key={v4()}  sx={{
                    background: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    padding: "20px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <Paper sx={{
                        width: "100px",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        [theme.breakpoints.up('md')]: {
                            width: "200px",
                            height: "200px",
                        },
                        borderRadius: "50%"
                    }}>
                        {icon}
                    </Paper>
                    <Typography  variant="overline">{name}</Typography>
                </Box>
            )
        })

    }

    return (
        <Paper data-testid={"song_ui"} sx={styles.card}>

            <Paper elevation={3} sx={{
                height: "100px",
                width: "100px",
                gridArea: "image",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: theme.palette.primary.dark,
                color: theme.palette.primary.light
            }}>
                <MusicNote />
            </Paper>

            <Box sx={{
                ...styles.details,
                gridArea:'title',
            }}>
                <Typography>{data.title}</Typography>
                <Typography>{secondsToSecondsMinutesHours(data.duration)}</Typography>
                <Typography>{dayjs(parseInt(data.releaseDate)).format("YYYY").toString()}</Typography>
            </Box>

            <Divider sx={{
                gridArea: "divider1"
            }} />

            <Box sx={{
                gridArea: "details"
            }}>
                <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="artists-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Attributed Artists
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}>
                        {render(data.artists, <RecordVoiceOverOutlined />)}
                    </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="albums-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Attributed Albums
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}>
                        {render(data.albums, <Album />)}
                    </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="genres-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Genres
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}>
                        {render(data.genres, <More />)}
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Paper>
    )


}


export const Song = (props: any) => {

    const navigate = useNavigate();
    let { id = '' } = useParams();

    const { data, isLoading, error } = useGetSong(id)

    const handler = () => {
        navigate(-1)
    }

    useEffect(() => {

        if(error){
            navigate('/404');
        }

    }, [error, navigate])


    return (
        <Box sx={styles.container}>

            <Box sx={{
                display:"flex",
                gap:"10px",
                gridArea:"backBtn"
            }}>
                <Button onClick={handler} variant="outlined" startIcon={<ArrowBack />}>
                    Dashboard
                </Button>
            </Box>

            {isLoading ? <SkeletonSong /> : data && !error ? <LoadedSong data={data} /> : <>poooo</>}
            
        </Box>
    )


}