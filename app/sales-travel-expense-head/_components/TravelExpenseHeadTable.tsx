import BasicDataTable from '@/components/BasicDataTable';
import { DataTablePagination } from '@/components/DataTablePagination';
import { Button } from '@/components/ui/button';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, RowData } from '@tanstack/react-table';
import { Edit, Save, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import TableToolbar from './TableToolbar';
const alternateData: any = [];

type TravelExpenseHeadTableProps = {
    travelExpenseHeadDetails: any;
};

const TravelExpenseHeadTable = ({ travelExpenseHeadDetails }: TravelExpenseHeadTableProps) => {

    console.log(travelExpenseHeadDetails, 'shipTogetherOrders');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const columns: ColumnDef<any>[] = [
        {
            id: 'sr_no',
            accessorKey: 'sr_no',
            header: 'Sr No',
            cell: ({ row }) => <p>{row.index + 1}</p>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: 'date',
            accessorKey: 'date',
            header: 'Date',
            cell: ({ row }) => <p className="truncate">{row.original.date}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'invoice_no',
            accessorKey: 'invoice_no',
            header: 'Invoice No',
            cell: ({ row }) => <p className="truncate">{row.original.invoice_no}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'expense_head',
            accessorKey: 'expense_head',
            header: 'Expense Head',
            cell: ({ row }) => <p className="truncate">{row.original.expense_head}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'expense_category',
            accessorKey: 'expense_category',
            header: 'Expense Category',
            cell: ({ row }) => <p className="truncate">{row.original.expense_category}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'currency',
            accessorKey: 'currency',
            header: 'Currency',
            cell: ({ row }) => <p className="truncate">{row.original.currency}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'invoice_amount',
            accessorKey: 'invoice_amount',
            header: 'Invoice Amount',
            cell: ({ row }) => <p className="truncate">{row.original.invoice_amount}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'approved_amount',
            accessorKey: 'approved_amount',
            header: 'Approved Amount',
            cell: ({ row }) => <p className="truncate">{row.original.approved_amount}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'notes',
            accessorKey: 'notes',
            header: 'Notes',
            cell: ({ row }) => <p className="truncate">{row.original.notes}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'orderNo',
            accessorKey: 'orderNo',
            header: 'Order No',
            cell: ({ row }) => <p className="truncate">{row.original.orderNo}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'salestrip',
            accessorKey: 'salestrip',
            header: 'Sales Trip',
            cell: ({ row }) => <p className="truncate">{row.original.salestrip}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping',
            accessorKey: 'grouping',
            header: 'Grouping',
            cell: ({ row }) => <p className="truncate">{row.original.grouping}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'salesperson',
            accessorKey: 'salesperson',
            header: 'Salesperson',
            cell: ({ row }) => <p className="truncate">{row.original.salesperson}</p>,
            enableSorting: true,
            enableHiding: true,
        },

        {
            id: 'Action',
            accessorKey: 'Action',
            header: 'Action',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        onClick={() => {

                        }}
                    >
                        <Save className="h-4 w-4 m-0" />
                    </Button>
                    <Button size="icon" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
    const table = useReactTable({
        data: travelExpenseHeadDetails ?? alternateData,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

    });
    return (
        <div className="space-y-2">
            <TableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <BasicDataTable table={table} columnsLength={columns.length} isLoading={false} />
            <div className="flex">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
};

export default TravelExpenseHeadTable;
