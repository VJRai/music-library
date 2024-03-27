import { useEffect, useRef } from "react";
import { Row as ReactTableRow, flexRender } from "@tanstack/react-table";
import { ListChildComponentProps } from "react-window";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SongDTO } from "../../common/types/song.types";


type RenderRowProps = { 
    row: ReactTableRow<SongDTO>, 
    setRowHeight: Function,
} & ListChildComponentProps


export const Row = ({ row, setRowHeight, index, style, isScrolling }: RenderRowProps) => {

    const rowRef = useRef<HTMLTableRowElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (rowRef.current) {
            setRowHeight(index, rowRef.current.clientHeight)
        }
    }, [index, isScrolling, rowRef, setRowHeight])

    const onClickHandler = () => {
        navigate(`/songs/${row.getValue('id')}`)
    }

    return (
        <TableRow
            ref={rowRef} 
            sx={{ 
                ...style, 
                display: "flex", 
                height: "unset",
            }} 
            hover={true}
            onClick={onClickHandler}
        >

            {row.getVisibleCells().map((cell) => {

                return (
                    <TableCell
                        key={cell.id}
                        style={{
                            display: 'flex',
                            width: cell.column.getSize(),
                        }}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                )
            })}

        </TableRow>
    );
}
