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

const StagesTable = ({ stagesTableData }: { stagesTableData: any }) => {
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


	console.log(stagesTableData?.data?.data, "stagesTableData 22222")

	const seen = new Set();
	const newData =stagesTableData?.data?.data.reduce((acc: any, item: { accounts_payment_approval_value: unknown; ordercount: any; }) => {
		if (item.accounts_payment_approval_value === "Full Payment" && !seen.has(item.accounts_payment_approval_value)) {
			seen.add(item.accounts_payment_approval_value);
			return acc + item.ordercount;
		}
		return acc;
	}, 0);

	console.log(newData, "newData")

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "accounts_payment_approval_value",
			header: "Stage",
			cell: ({ row }) => {
				const data = row.original;
				// const res = data.filter((item: { accounts_payment_approval_value: any; }, index: any, self: any[]) => 
				// 	index === self.findIndex((t) => (
				// 		t.accounts_payment_approval_value === item.accounts_payment_approval_value
				// 	)))
				console.log(data, "response")
				return (
					<>
					{data.accounts_payment_approval_value}</>
				)
				
			},
		},
		// {
		// 	header: "Count",

		// 	cell: ({ row }) => {
		// 		const data = row.original;
		// 		const totalOrderCount = data.reduce((acc : any, item :any) => {
		// 			if (item.accounts_payment_approval_value === "Full Payment") {
		// 				return acc + item.ordercount;
		// 			}
		// 			return acc;
		// 		}, 0);
		// 		return (
		// 			<div>
		// 				<Link href="/pending-orderlist#pendingTable">
		// 					<Button onClick={() => {}}>{totalOrderCount}</Button>
		// 				</Link>
		// 			</div>
		// 		);
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Urgent{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_urgent = 0;
		// 						count_urgent += data
		// 							.filter(
		// 								(value: any) => value.orderpriority_value === "Urgent",
		// 							)
		// 							.reduce(
		// 								(total: number, value: any) => total + value.fabric_count,
		// 								0,
		// 							);

		// 						return count_urgent;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Urgent",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value == headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count == 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Fitting{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_fitting = 0;
		// 						count_fitting +=
		// 							data?.find(
		// 								(value: any) => value.orderpriority_value === "Fitting",
		// 							)?.fabric_count || 0;

		// 						return count_fitting;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Fitting",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value == headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count == 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			ROF-NC{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_rofnc = 0;
		// 						count_rofnc += data?.filter(
		// 								(value: any) => value.orderpriority_value === "ROF-NC",
		// 							)
		// 							.reduce(
		// 								(total: number, value: any) => total + value.fabric_count,
		// 								0,
		// 							);

		// 						return count_rofnc;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "ROF-NC",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value === headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count === 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			ROF-C{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_rofc = 0;
		// 						count_rofc +=
		// 							data?.find(
		// 								(value: any) => value.orderpriority_value === "ROF-C",
		// 							)?.fabric_count || 0;

		// 						return count_rofc;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "ROF-C",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value === headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<>
		// 					{alterationValue?.fabric_issue_status_value === "Completed" ||
		// 					alterationValue?.fabric_issue_status_value ===
		// 						"Partial Completed" ? (
		// 						<Link
		// 							className="rounded-lg bg-gray-700 p-[4px] text-white "
		// 							href="/pending-orderlist#pendingTable"
		// 						>
		// 							{match[0].fabric_count === 0 ? "-" : match[0].fabric_count}
		// 						</Link>
		// 					) : (
		// 						<Link
		// 							className="text-blue-600 "
		// 							href="/pending-orderlist#pendingTable"
		// 						>
		// 							{match[0].fabric_count === 0 ? "-" : match[0].fabric_count}
		// 						</Link>
		// 					)}
		// 				</>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Normal{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_normal = 0;
		// 						count_normal += data?.filter(
		// 								(value: any) => value.orderpriority_value === "Normal",
		// 							)
		// 							.reduce(
		// 								(total: number, value: any) => total + value.fabric_count,
		// 								0,
		// 							);

		// 						return count_normal;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Normal",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value === headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count === 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Alteration
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_alteration = 0;
		// 						count_alteration += data?.filter(
		// 								(value: any) => value.orderpriority_value === "Alteration",
		// 							)
		// 							.reduce(
		// 								(total: number, currentValue: any) =>
		// 									total + currentValue.fabric_count,
		// 								0,
		// 							);

		// 						return count_alteration;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Alteration",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value == headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count == 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}

		// 		return <div>-</div>;
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Wedding{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_wedding = 0;
		// 						count_wedding += data?.filter(
		// 								(value: any) => value.orderpriority_value === "Wedding",
		// 							)
		// 							.reduce(
		// 								(total: number, value: any) => total + value.fabric_count,
		// 								0,
		// 							);
		// 						return count_wedding;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Wedding",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value == headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count == 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },
		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Remake{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_remake = 0;
		// 						count_remake += data?.filter(
		// 								(value: any) => value.orderpriority_value === "Remake",
		// 							)
		// 							.reduce(
		// 								(total: number, status: any) => total + status.fabric_count,
		// 								0,
		// 							);

		// 						return count_remake;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Remake",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value === headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count === 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },

		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			VIP{" "}
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_vip = 0;
		// 						count_vip +=
		// 							data?.find(
		// 								(value: any) => value.orderpriority_value === "VIP",
		// 							)?.fabric_count || 0;

		// 						return count_vip;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "VIP",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value == headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count == 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}
		// 		// Fallback if no matching status found
		// 		return <div>0</div>; // Adjust as necessary
		// 	},
		// },

		// {
		// 	accessorKey: "",
		// 	header: ({ table }) => (
		// 		<Link
		// 			href="/pending-orderlist#pendingTable"
		// 			className="flex items-center gap-1 truncate"
		// 		>
		// 			Cancelled
		// 			<Badge>
		// 				{table
		// 					?.getPrePaginationRowModel()
		// 					.rows.map((data) => data.original)
		// 					.map((data) => {
		// 						let count_cancelled = 0;
		// 						count_cancelled = data?.filter(
		// 								(value: any) => value.orderpriority_value === "Cancelled",
		// 							)
		// 							.reduce(
		// 								(total: number, currentValue: any) =>
		// 									total + currentValue.fabric_count,
		// 								0,
		// 							);

		// 						return count_cancelled;
		// 					})
		// 					.reduce((total, currentValue) => total + currentValue, 0)}
		// 			</Badge>
		// 		</Link>
		// 	),
		// 	id: "Cancelled",
		// 	cell: ({ row, column }) => {
		// 		const alterationValue = row.original;
		// 		const headerName = column.id;

		// 		const match = alterationValue?.filter(
		// 			(status: any) => status.orderpriority_value === headerName,
		// 		);

		// 		if (match) {
		// 			return (
		// 				<Link
		// 					className="text-blue-500"
		// 					href="/pending-orderlist#pendingTable"
		// 				>
		// 					{match[0].fabric_count === 0 ? "-" : match[0].fabric_count}
		// 				</Link>
		// 			);
		// 		}

		// 		return <div>0</div>;
		// 	},
		// },
	];



	const table = useReactTable({
		data: stagesTableData?.data?.data|| alternativeData,
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
				isLoading={stagesTableData?.isLoading}
			/>
		</div>
	);
};

export default StagesTable;
