import { Row as ReactTableRow, flexRender } from "@tanstack/react-table";
import { Song } from "../../common/types/row.type";
import { CSSStyles } from "../../common/types/style.type";
import { RefObject, useEffect, useRef } from "react";
import { ListChildComponentProps } from "react-window";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";


type RenderRowProps = { 
    row: ReactTableRow<Song>, 
    // isScrolling: boolean,
    // styles?: CSSStyles,
    // index: number,
    setRowHeight: Function,
} & ListChildComponentProps

const styles: CSSStyles = {
    tableBodyRow: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
    },
    tableBodyRowCell: {
        display: 'flex'
    }
};

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
