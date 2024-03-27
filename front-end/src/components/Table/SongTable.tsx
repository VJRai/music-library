import { AlbumOutlined, ArrowDownward, ArrowUpward, LabelOutlined, PersonOutline } from "@mui/icons-material";
import { Box, Button, Paper, SxProps, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Theme, Typography } from "@mui/material"
import { SortingState, Updater, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ChangeEvent, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom"
import { VariableSizeList as List, ListChildComponentProps, VariableSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSStyles } from "../../common/types/style.type";
import { Row } from "../../components/Table/Row";
import { TablePaginationActions } from "../../components/Table/TablePaginationActions";
import { SkeletonRow } from "../../components/Table/SkeletonRow";
import { v4 } from 'uuid';
import { useGetSongs } from "../../api/apiClient";
import { secondsToSecondsMinutesHours } from "../../common/utils";
import { Tags } from "./Tags";
import { SongDTO, SongsDTO } from "../../common/types/song.types";

const initialDashboardSearchParams = {
    sortBy: `id:asc`,
    page: "0",
    size: "10"
}

const columnHelper = createColumnHelper<SongDTO>()

const styles: CSSStyles = {
    container: {
        gridArea:"table",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: "-webkit-fill-available",
    },
    table: {
        flex: 1,
        display: 'grid',
        gridTemplateRows: "auto 1fr",
        overflow: 'scroll'
    },
    tableHeader: {
        display: 'flex',
        position: 'sticky',
        top: 0,
        zIndex: 1
    },
    tableHeaderColumnContainer: {
        cursor: 'pointer',
        display: 'flex',
    },
    tableHeaderColumn: { display: 'flex', alignItems: 'center' },
    tableBody: {
        display: 'grid',
        position: 'relative',
    },
    tableBodyRow: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
    },
    tableBodyRowCell: {
        display: 'flex'
    }
};


const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
        header: () => <span>ID</span>,
        size: 75
    }),
    columnHelper.accessor('title', {
        id: 'title',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Title</span>,
    }),
    columnHelper.accessor('duration', {
        header: () => 'Duration',
        cell: info => secondsToSecondsMinutesHours(info.renderValue() || 0),
        size: 90
    }),
    columnHelper.accessor('releaseDate', {
        header: () => <span>Release Year</span>,
        cell: info => dayjs(parseInt(info.getValue())).format("YYYY").toString(),
    }),
    columnHelper.accessor('artists', {
        header: () => <span>Attributed Artists</span>,
        cell: info => {
            return Tags(info.getValue(), <PersonOutline />)
        },
        size: 250
    }),
    columnHelper.accessor('albums', {
        header: () => <span>Attributed Albums</span>,
        cell: info => {
            return Tags(info.getValue(), <AlbumOutlined />)
        },
        size: 250
    }),
    columnHelper.accessor('genres', {
        header: () => <span>Genres</span>,
        cell: info => {
            return Tags(info.getValue(), <LabelOutlined />)
        },
        size: 200
    }),
]

export const SongTable = () => {

    const { drawerRef } = useOutletContext<{
        drawerRef: MutableRefObject<HTMLDivElement | null>
    }>();

    const listRef = useRef<VariableSizeList<any> | null>(null)
    const rowHeights = useRef<{
        [key: string]: number
    }>({});

    const [searchParams, setSearchParams] = useSearchParams(initialDashboardSearchParams);

    const params = Array.from(searchParams.entries()).flatMap(([k, v]) => `${k}=${v}`).join('&');

    const { data, isLoading, error } = useGetSongs(params);

    const [tableData, setTableData] = useState<SongsDTO>();
    const [sorting, setSorting] = useState<SortingState>([]);

    useEffect(() => {

        if (!sorting.length) {
            setSearchParams((prev) => {
                prev.delete("sortBy")
                return prev;
            })
            return;
        }

        const newSortingParams = sorting.map(({ id, desc }) => `${id}:${desc ? 'desc' : 'asc'}`);

        setSearchParams((prev) => {
            prev.set('sortBy', newSortingParams.join(','))
            return prev;
        })

    }, [JSON.stringify(sorting)])

    useEffect(() => {
        setTableData(data)
    }, [data])


    const table = useReactTable({
        data: tableData?.content || [],
        columns,
        state: {
            sorting,
        },
        enableMultiSort: true,
        onSortingChange: (v: Updater<SortingState>) => setSorting(v),
        debugTable: true,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        rowCount: tableData?.totalElements || 0,
    })

    const { rows } = useMemo(() => table.getRowModel(), [JSON.stringify(tableData?.content), table]);


    const renderSortIcon = (header: any) => {

        const sx: SxProps<Theme> = {
            marginLeft: '3px',
            fontSize: '1em',
        }

        const sortOrder = header.column.getIsSorted()
        if (sortOrder === false) {
            return null
        }

        if (sortOrder === 'asc') {
            return <ArrowUpward sx={sx} />
        } else {
            return <ArrowDownward sx={sx} />

        }
    }

    const updateRowCountHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setSearchParams((prev) => {
            prev.set("size", `${e.target.value}`)
            return prev;
        })

    }

    const getRowHeight = (index: number) => {
        return rowHeights.current[index] || 200;
    }

    const setRowHeight = (index: number, size: number) => {
        listRef?.current?.resetAfterIndex(0);
        rowHeights.current = { ...rowHeights.current, [index]: size };
    }

    const changePageHandler = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setSearchParams((prev) => {
            prev.set("page", `${newPage}`)
            return prev;
        })
    };

    const retryHandler = () => {
        setSearchParams(initialDashboardSearchParams)
    }


    const renderTableBody = () => {

        if (error) {
            return (
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column"
                }}>
                    <Box>
                        <Typography sx={{fontWeight: "bold"}} variant="h6">
                            Oh no!
                        </Typography>
                    </Box>
                    <Typography>
                        An issue seems to have occured while fetching your songs.<br/>
                    </Typography>
                    <Button onClick={retryHandler} sx={{
                        marginTop: "30px"
                    }} variant="outlined">LETS TRY AGAIN</Button>
                </Box>
            )
        }


        if (isLoading || !tableData) {
            return Array.from(Array(10).keys()).map(() => <SkeletonRow key={v4()} />)
        }

        if(!isLoading && !error && !tableData.numberOfElements){

            let feedback = 'Looks like you have no song entries. Press the little + icon at the bottom right-hand corner & start creating some!'

            if(searchParams.has('filter')){
                feedback = 'Looks like your search rendered no results...'
            }

            return (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold" }} variant="h6">
                            Oh no!
                        </Typography>
                    </Box>
                    <Typography>
                        {feedback}
                    </Typography>
                </Box>
            )
        }

        return (
            <div>
                <AutoSizer>
                    {({ height, width }: any) =>
                        <List
                            ref={listRef}
                            useIsScrolling={true}
                            height={height}
                            itemCount={rows.length}
                            itemSize={getRowHeight}
                            width={width}
                        >
                            {(listChildProps: ListChildComponentProps) => Row({
                                ...listChildProps,
                                row: rows[listChildProps.index],
                                setRowHeight,
                            })}
                        </List>}
                </AutoSizer>
            </div>
        )

    }


    return (

        <Paper sx={{
            ...styles.container,
            height: `calc(100vh - 40px - ${drawerRef?.current ? drawerRef?.current?.clientHeight : 0}px)`,
        }}>

            <Table
                stickyHeader
                aria-label="simple table"
                sx={styles.table}
            >
                <TableHead
                    sx={styles.tableHeader}
                >
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow
                            key={headerGroup.id}
                            sx={{
                                display: 'flex'
                            }}
                        >
                            {headerGroup.headers.map(header => (
                                <TableCell
                                    sx={{
                                        ...styles.tableHeaderColumnContainer,
                                        width: header.getSize()
                                    }}
                                    key={header.id}
                                    onClick={() => header.column.toggleSorting(undefined, true)}
                                >
                                    <Box sx={styles.tableHeaderColumn}>
                                        {
                                            header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                        }
                                        {renderSortIcon(header)}

                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody sx={styles.tableBody}>
                    {renderTableBody()}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25, 50, 100, 1000]}
                colSpan={3}
                count={tableData?.totalElements || 0}
                rowsPerPage={tableData?.size || 0}
                page={tableData?.pageable.pageNumber || 0}
                slotProps={{
                    select: {
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    },
                }}
                onPageChange={changePageHandler}
                onRowsPerPageChange={updateRowCountHandler}
                ActionsComponent={TablePaginationActions}
            />

        </Paper>

    )

}