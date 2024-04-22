import BasicDataTable from '@/components/BasicDataTable';
import { DataTablePagination } from '@/components/DataTablePagination';
import { Button } from '@/components/ui/button';
import { UseQueryResult } from '@tanstack/react-query';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
const alternateData: any = [];

type MainOrderTableProps = {
    comissionDetails: any;
};

const MainOrderTable = ({ comissionDetails }: MainOrderTableProps) => {
    const router = useRouter();
    console.log(comissionDetails, 'shipTogetherOrders');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [addParent, setAddParent] = React.useState(false);
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
            cell: ({ row }) => <p className="truncate">{row.original.host_sales_commision}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'host_sales_commision',
            accessorKey: 'host_sales_commision',
            header: 'Other Host Sales Commission',
            cell: ({ row }) => <p className="truncate">{row.original.host_sales_commision}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'host_sales_commision',
            accessorKey: 'New Size Meas Commission',
            header: 'New Size Meas Commission',
            cell: ({ row }) => <p className="truncate">{row.original.salestrip_name}</p>,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'host_sales_commision',
            accessorKey: 'Old Size Meas Commission',
            header: 'Old Size Meas Commission',
            cell: ({ row }) => <p className="truncate">{row.original.salestrip_name}</p>,
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
                        <Edit className="h-4 w-4 m-0" />
                    </Button>
                    <Button size="icon" variant="outline">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
    const tableData = comissionDetails ?? alternateData;
    const table = useReactTable({
        data: tableData,
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
        <div className="space-y-3">
            <BasicDataTable table={table} columnsLength={columns.length} isLoading={false} />
            <div className="flex">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
};

export default MainOrderTable;
