import BasicDataTable from '@/components/BasicDataTable';
import { DataTablePagination } from '@/components/DataTablePagination';
import { Button } from '@/components/ui/button';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    RowData,
} from '@tanstack/react-table';
import { Edit, Save, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import TableToolbar from './TableToolbar';
import EditableCell from './EditableCell';
import usePostProvider from '@/hooks/usePostProvider';
import { toast } from 'sonner';
const alternateData: any = [];

type MainOrderTableProps = {
    year: string;
    comissionDetails: any;
};

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateCommissionExpenseHead?: (rowIndex: number, columnId: keyof any, value: string) => void;
    }
}

const CommissionExpenseHeadTable = ({ year, comissionDetails }: MainOrderTableProps) => {
    console.log(comissionDetails?.data?.data, 'commission details');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [commissionData, setCommissionData] = React.useState(
        comissionDetails?.data?.data?.sort((a: any, b: any) => (a.grouping_fromdate > b.grouping_fromdate ? -1 : a.grouping_fromdate < b.grouping_fromdate ? 1 : 0)) ?? alternateData
    );

    useEffect(() => {
        setCommissionData(
            comissionDetails?.data?.data?.sort((a: any, b: any) => (a.grouping_fromdate > b.grouping_fromdate ? -1 : a.grouping_fromdate < b.grouping_fromdate ? 1 : 0)) ?? alternateData
        );
    }, [year, comissionDetails?.data?.data]);

    const updateCommissionExpenseHead = usePostProvider();
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
            id: 'host_sales_commission',
            accessorKey: 'host_sales_commission',
            header: 'Host Sales Commission',
            cell: EditableCell,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'other_host_sales_commission',
            accessorKey: 'other_host_sales_commission',
            header: 'Other Host Sales Commission',
            cell: EditableCell,
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'salesperson_commission',
            accessorKey: 'salesperson_commission',
            header: 'Salesperson Commission',
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
                            const payload = {
                                salestrip_m_grouping_id: row?.original?.salestrip_m_grouping_id,
                                host_sales_commission: row?.original?.host_sales_commission ?? null,
                                salesperson_commission: row?.original?.salesperson_commission ?? null,
                                other_host_sales_commission: row?.original?.other_host_sales_commission ?? null,
                                new_size_meas_commission: row?.original?.new_size_meas_commission ?? null,
                                old_size_meas_commission: row?.original?.old_size_meas_commission ?? null,
                            };
                            console.log(payload, 'this is payload');
                            updateCommissionExpenseHead.mutateAsync(
                                {
                                    method: 'PUT',
                                    endpoint: 'api/commission/update-grouping',
                                    payload: payload,
                                },
                                {
                                    onSuccess: () => {
                                        console.log('success');
                                        comissionDetails.refetch();
                                        toast.success('Commission Expense Head Updated Successfully');
                                    },
                                    onError: () => {
                                        console.log('error');
                                        toast.error('Error Updating Commission Expense Head');
                                    },
                                }
                            );
                        }}
                    >
                        <Save className="h-4 w-4 m-0" />
                    </Button>
                    {/* <Button size="icon" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button> */}
                </div>
            ),
        },
    ];
    console.log(commissionData, 'this is commission data');
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
            <div className="text-danger flex justify-end font-medium">
                <p>Note: Please click on save icon before leaving the page.</p>
            </div>
            <TableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <BasicDataTable table={table} columnsLength={columns.length} isLoading={comissionDetails.isFetching} />
            <div className="flex">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
};

export default CommissionExpenseHeadTable;
