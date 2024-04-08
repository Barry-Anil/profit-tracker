import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from './ui/button';
import { FileSpreadsheet } from 'lucide-react';

const DownloadCSVButton = ({ table, filename, excludedColumns, csvdata }: { table: any; filename: string; excludedColumns?: string[] | undefined, csvdata?: any }) => {
    // this gives the filtered out data for the csv
    const data = table.getPrePaginationRowModel().rows.map((row: any) => {
        const formattedData: { [key: string]: string | undefined } = {};
        row.getAllCells().forEach((cell: any) => {
            if (cell.column && excludedColumns && !excludedColumns.includes(cell.column.id)) {
                formattedData[cell.column.columnDef.header] = cell.getValue() as string | undefined;
            }
        });
        return formattedData;
    });
    return (
        <Button variant="link" disabled={data.length === 0} onClick={() => {
            console.log(data, " data in download csv button");
            console.log(csvdata, " csv data in download csv button");
        }}>
            <CSVLink data={csvdata ? csvdata : data} filename={filename} className="flex">
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Download CSV
            </CSVLink>
        </Button>
    );
};

export default DownloadCSVButton;
