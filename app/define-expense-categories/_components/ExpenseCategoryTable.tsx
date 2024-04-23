import React from 'react';

import { DataTablePagination } from '@/components/DataTablePagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Loader } from 'lucide-react';
import TableToolbar from './TableToolbar';
import { FabricTypesColumns } from './columns';
import BasicDataTable from '@/components/BasicDataTable';
const alternateData: any = [];
const ExpenseCategoryTable = ({ expenseData }: any) => {
    const columns = FabricTypesColumns();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    // const tableData = expenseData?.data?.success?.[0]?.fabric_type?.sort((a: any, b: any) => a.sortorder - b.sortorder) ?? alternateData;
    const table = useReactTable({
        data: expenseData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    });

    return (
        <div className="w-full">
            <TableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <BasicDataTable table={table} columnsLength={columns.length} isLoading={false} />
            <div className="flex py-3 justify-end">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
};

export default ExpenseCategoryTable;
