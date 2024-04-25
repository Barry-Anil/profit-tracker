import React from 'react';

import BasicDataTable from '@/components/BasicDataTable';
import { DataTablePagination } from '@/components/DataTablePagination';
import { ColumnFiltersState, SortingState, VisibilityState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import TableToolbar from './TableToolbar';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import usePostProvider from '@/hooks/usePostProvider';
import { toast } from 'sonner';
const alternateData: any = [];

type TableProps = {
    categoryData: any;
    refetchCategoryData: any;
}
const ExpenseCategoryTable = ({ categoryData, refetchCategoryData }: TableProps) => {
    console.log(categoryData, 'categoryData');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const tableData = categoryData ?? alternateData;

    const deleteSubCategory = usePostProvider();

    const columns: ColumnDef<any>[] = [
        {
            id: 'sr_no',
            header: 'Sr No',
            cell: ({ row }) => <p>{row.index + 1}</p>,
            enableSorting: false,
            enableHiding: false,
            size: 20,
        },
        {
            accessorKey: 'subcategory_name',
            header: 'Expense Sub-category',
            cell: ({ row }) => <p className="truncate">{row.getValue('subcategory_name') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'expense_type_name',
            header: 'Expense Type',
            cell: ({ row }) => <p className="truncate">{row.getValue('expense_type_name') ?? 'NA'}</p>,
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ row }) => <Button variant="destructive" onClick={() => {
                deleteSubCategory.mutateAsync({
                    method: 'DELETE',
                    endpoint: `api/expense/category/delete?expenseid=${row?.original?.expense_id}`
                }, {
                    onSuccess: () => {
                        toast.success('Sub-category deleted successfully');
                        refetchCategoryData();
                    },
                    onError: () => {
                        toast.error('Failed to delete sub-category');
                    }
                })
            }}><Trash2 size={16} /></Button>,
        }
    ];

    const table = useReactTable({
        data: tableData,
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
