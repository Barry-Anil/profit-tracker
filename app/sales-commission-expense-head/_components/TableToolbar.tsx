import { Table } from '@tanstack/react-table';
import React from 'react';
import DownloadCSVButton from '@/components/DownloadCSVButton';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
// import { SalesTripMasterType } from '../types';

type TableToolbarProps = {
    table: Table<any>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
};

const TableToolbar = ({ table, globalFilter, setGlobalFilter }: TableToolbarProps) => {

    return (
        <div className="flex flex-wrap items-center justify-between py-4 gap-4 w-full">
            <div className="flex flex-wrap items-center gap-2">
                <DownloadCSVButton table={table} filename={`-order-summary-items.csv`} excludedColumns={['sr_no', 'actions']} />
                <DownloadPDFButton table={table} filename={`-order-summary-items.pdf`} excludedColumns={['sr_no', 'actions']}
                />
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center justify-end">
                <Input placeholder="Search All Columns" value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} className="max-w-sm" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default TableToolbar;
