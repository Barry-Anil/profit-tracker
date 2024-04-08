import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader } from 'lucide-react';
import { Table as TableType, flexRender } from '@tanstack/react-table';
import DataTableLoader from './DataTableLoader';

interface BasicDataTableProps {
    isLoading: boolean;
    table: TableType<any>;
    columnsLength: number;
}

const BasicDataTable = ({ isLoading, table, columnsLength }: BasicDataTableProps) => {
    return (
        <div className="rounded-md border">
            {isLoading ? (
                <DataTableLoader />
            ) : (
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-black dark:text-white">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800 ' : 'bg-gray-100   dark:bg-black '} dark:hover:bg-gray-600 hover:bg-gray-200`}
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columnsLength} className="h-24 text-center dark:bg-black">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default BasicDataTable;
