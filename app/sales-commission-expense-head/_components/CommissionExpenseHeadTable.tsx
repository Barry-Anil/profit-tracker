import BasicDataTable from '@/components/BasicDataTable';
import { DataTablePagination } from '@/components/DataTablePagination';
import { Button } from '@/components/ui/button';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, RowData } from '@tanstack/react-table';
import { Edit, Save, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import TableToolbar from './TableToolbar';
import EditableCell from './EditableCell';
const alternateData: any = [];

type MainOrderTableProps = {
    comissionDetails: any;
};

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateCommissionExpenseHead?: (rowIndex: number, columnId: keyof any, value: string) => void;
    }
}

const MainOrderTable = ({ comissionDetails }: MainOrderTableProps) => {
    const router = useRouter();
    console.log(comissionDetails, 'shipTogetherOrders');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [commissionData, setCommissionData] = React.useState(comissionDetails ?? alternateData);
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
            id: 'grouping_name',
            accessorKey: 'grouping_name',
            header: 'Grouping Name',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_name}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_place',
            accessorKey: 'grouping_place',
            header: 'Grouping Place',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_place}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_host',
            accessorKey: 'grouping_host',
            header: 'Grouping Host',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_host}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_event',
            accessorKey: 'grouping_event',
            header: 'Grouping Event',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_event}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_fromdate',
            accessorKey: 'grouping_fromdate',
            header: 'From Date',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_fromdate}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_todate',
            accessorKey: 'grouping_todate',
            header: 'To Date',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_todate}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_status',
            accessorKey: 'grouping_status',
            header: 'Grouping Status',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_status}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'grouping_closedate',
            accessorKey: 'grouping_closedate',
            header: 'Grouping Close Date',
            cell: ({ row }) => <p className="truncate">{row.original.grouping_closedate}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'host_sales_commision',
            accessorKey: 'host_sales_commision',
            header: 'Host Sales Commission',
            cell: EditableCell,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'other_host_sales_commision',
            accessorKey: 'other_host_sales_commision',
            header: 'Other Host Sales Commission',
            cell: EditableCell,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'new_size_meas_commission',
            accessorKey: 'new_size_meas_commission',
            header: 'New Size Meas Commission',
            cell: EditableCell,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'old_size_meas_commission',
            accessorKey: 'old_size_meas_commission',
            header: 'Old Size Meas Commission',
            cell: EditableCell,
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
    console.log(commissionData, "this is commission data");;
    const table = useReactTable({
        data: commissionData,
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
        meta: {
            updateCommissionExpenseHead: (rowIndex: number, columnId: keyof any, value: string) => {
                setCommissionData((data: any[]) => {
                    const editedData = data.map((row: any, index: number) =>
                        // tableData = data.map((row: any, index: number) =>
                        index === rowIndex
                            ? {
                                ...data[rowIndex],
                                [columnId]: Number(value),
                            }
                            : row
                    );
                    return editedData;
                });
            },
        },
    });
    return (
        <div className="space-y-3">
            <TableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <BasicDataTable table={table} columnsLength={columns.length} isLoading={false} />
            <div className="flex">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
};

export default MainOrderTable;
