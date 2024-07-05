import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import BasicDataTable from "@/components/BasicDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const alternativeData: any[] = [];

const StagesTable = ({ stagesData, selectedData, setColumnID, setColumnIdValues, setIsOrderPriority, setFabricIssue, setRowIdValues, setRowID }: { stagesData: any, selectedData:any, setColumnID:any, setColumnIdValues:any, setIsOrderPriority:any, setFabricIssue:any, setRowIdValues:any, setRowID: any}) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const searchParams = useSearchParams();
	const source = searchParams.get("source");
	const setSource = (value: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("source", value);
		window.history.replaceState({}, "", `?${searchParams.toString()}`);
	};


	console.log(stagesData?.data?.data, "stagesTableData 22222")

    const handleClick = (row: any, column: any) => {
        let column_id = column?.id;
        let column_row = row?.original?.fabric_approved_status?.find((item: any) => item.orderpriority_value == column_id);
        // console.log(column_row?.orderpriority_value, 'adjahsdihasdujkg');
        // console.log(row?.original?.fabric_issue_status_value, 'row');
        if (column_row) {
            setColumnID(column_row?.orderpriority);
            setColumnIdValues(column_row?.orderpriority_value);
            setIsOrderPriority(true);
            setFabricIssue('');
        }
        setFabricIssue('');
        setRowID(row?.original?.fabric_issue_status);
        setColumnIdValues(column_row?.orderpriority_value);
        setRowIdValues(row?.original?.fabric_issue_status_value);
    };


	const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'accounts_payment_approval_val',
            header: '_',
            cell: ({ row }) => {
                const data = row.original;
                const res = data?.accounts_payment_approval_val;
                if (res) {
                    return <div className={res === 'Partial Completed' || res === 'Cutting' ? 'rounded-md bg-blue-500 p-2 font-medium text-white' : 'font-medium'}>{res}</div>;
                }
            },
        },
        {
            header: '_',

            cell: ({ row }) => {
                const data = row.original;
                const count = data?.total_order_count;
                return (
                    <div>
                        <Link href="/pending-orderlist#pendingTable">
                            <Button onClick={() => {}}>{count}</Button>
                        </Link>
                    </div>
                );
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Alteration
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_alteration = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Alteration') {
                                            count_alteration += value.ordercount;
                                        }
                                    });

                                    return count_alteration;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Alteration',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }

                return <div>-</div>;
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Cancelled
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_cancelled = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Cancelled') {
                                            count_cancelled += value.ordercount;
                                        }
                                    });

                                    return count_cancelled;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Cancelled',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;
                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }

                return <div>0</div>;
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Fitting{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_fitting = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Fitting') {
                                            count_fitting += value.ordercount;
                                        }
                                    });

                                    return count_fitting;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Fitting',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },

        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    ROF-C{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_rofc = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'ROF-C') {
                                            count_rofc += value.ordercount;
                                        }
                                    });

                                    return count_rofc;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'ROF-C',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <>
                            {alterationValue?.fabric_issue_status_value == 'Completed' || alterationValue?.fabric_issue_status_value == 'Partial Completed' ? (
                                <Link className="rounded-lg bg-gray-700 p-[4px] text-white " href="/pending-orderlist#pendingTable">
                                    {match[0].ordercount == 0 ? " " : match[0].ordercount}
                                </Link>
                            ) : (
                                <Link className="text-blue-600 " href="/pending-orderlist#pendingTable">
                                    {match[0].ordercount == 0 ? " " : match[0].ordercount}
                                </Link>
                            )}
                        </>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    ROF-NC{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_rofnc = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'ROF-NC') {
                                            count_rofnc += value.ordercount;
                                        }
                                    });

                                    return count_rofnc;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'ROF-NC',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Normal{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_normal = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Normal') {
                                            count_normal += value.ordercount;
                                        }
                                    });

                                    return count_normal;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Normal',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Remake{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_remake = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Remake') {
                                            count_remake += value.ordercount;
                                        }
                                    });

                                    return count_remake;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Remake',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Urgent{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_urgent = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Urgent') {
                                            count_urgent += value.ordercount;
                                        }
                                    });

                                    return count_urgent;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Urgent',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    VIP{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_vip = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'VIP') {
                                            count_vip += value.ordercount;
                                        }
                                    });

                                    return count_vip;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'VIP',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
        {
            accessorKey: '',
            header: ({ table }) => (
                <Link href="/pending-orderlist#pendingTable" className="flex items-center gap-1 truncate">
                    Wedding{' '}
                    <Badge>
                        {table &&
                            table
                                .getPrePaginationRowModel()
                                .rows.map((data) => data.original)
                                .map((data) => {
                                    let count_wedding = 0;
                                    data.accounts_payment_approval_status.forEach((value: any) => {
                                        if (value.orderpriority_value === 'Wedding') {
                                            count_wedding += value.ordercount;
                                        }
                                    });

                                    return count_wedding;
                                })
                                .reduce((total, currentValue) => total + currentValue, 0)}
                    </Badge>
                </Link>
            ),
            id: 'Wedding',
            cell: ({ row, column }) => {
                const alterationValue = row.original;
                const headerName = column.id;

                const match = alterationValue.accounts_payment_approval_status?.filter((status: any) => status.orderpriority_value == headerName);

                if (match) {
                    return (
                        <Link className="text-blue-500" href="/pending-orderlist#pendingTable">
                            {match[0].ordercount == 0 ? " " : match[0].ordercount}
                        </Link>
                    );
                }
                // Fallback if no matching status found
                return <div>0</div>; // Adjust as necessary
            },
        },
    ];

	const table = useReactTable({
		data: stagesData?.data?.data[selectedData] || alternativeData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	return (
		<div>
			<BasicDataTable
				table={table}
				columnsLength={columns.length}
				isLoading={stagesData?.isLoading}
			/>
		</div>
	);
};

export default StagesTable;
