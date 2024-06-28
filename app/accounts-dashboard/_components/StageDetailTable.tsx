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
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
const alternativeData: any[] = [];

const StageDetailTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const searchParams = useSearchParams();

	const columns: ColumnDef<any>[] = [
		{
			id: "select",
			header: "Action",
			cell: ({ row }) => {
				// if (rowID === 'Partial Completed') {
				//     setApproveButtonColor('text-yellow-800 border border-yellow-500');
				// }

				// if (rowID === 'Cutting') {
				//     setApproveButtonColor('text-red-500 border border-red-500');
				// }

				// if (rowID === 'Pending Accounts Approval') {
				//     setApproveButtonColor('text-red-500 border border-red-500');
				// }

				// if (rowID === 'Completed') {
				//     setApproveButtonColor('text-green-800 border border-green-500');
				// }

				// // console.log(approveButtonColor, 'approveButtonColor');
				return (
					<div className="flex gap-2">
						{/* <UpdateEdit row={row} />
                        <Button variant="link" className={`text-base ${approveButtonColor}`}>
                            Approve & Create <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button> */}
					</div>
				);
			},
		},
		{
			accessorKey: "approvalcode",
			header: "Approval Code",
			cell: ({ row }) => {
				return <p className="font-semibold">{row.getValue("approvalcode")}</p>;
			},
			size: 800,
		},
		{
			accessorKey: "ordernumber",
			header: "Order Number",
			cell: ({ row }) => {
				return <p className="font-semibold">{row.getValue("ordernumber")}</p>;
			},
			size: 800,
		},
		{
			accessorKey: "orderdate",
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting()}>
						Order Date{" "}
						<span className="text-primary ml-1">
							{" "}
							{column.getIsSorted() === "asc"
								? "(Asc)"
								: column.getIsSorted() === "desc"
									? "(Desc)"
									: ""}
						</span>
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const date = new Date(row?.getValue("orderdate"));
				const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				return <div className="truncate capitalize">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "quality_eta",
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting()}>
						Order Since{" "}
						<span className="text-primary ml-1">
							{" "}
							{column.getIsSorted() === "asc"
								? "(Desc)"
								: column.getIsSorted() === "desc"
									? "(Asc)"
									: ""}
						</span>
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const formatted_date = new Date(
					String(row?.original.quality_eta)?.slice(0, 24),
				);
				const today_date = new Date();
				const order_since = Math.ceil(
					(today_date.getTime() - formatted_date.getTime()) /
						(1000 * 60 * 60 * 24),
				);

				let delay: boolean;

				// if (order_since >= 10 && rowID === "Partial Completed") {
				// 	delay = true;
				// }

				// if (
				// 	order_since >= 100 &&
				// 	rowID === "Cutting" &&
				// 	columnID !== "Alteration"
				// ) {
				// 	delay = true;
				// }

				// if (order_since >= 100 && rowID === "Pending Accounts Approval") {
				// 	delay = true;
				// }

				// if (
				// 	order_since >= 60 &&
				// 	rowID === "Completed" &&
				// 	columnID === "Normal"
				// ) {
				// 	delay = true;
				// }

				return (
					// <p className={`${delay ? "text-red-500" : ""} font-semibold`}>
					// 	{order_since}{" "}
					// </p>
					<p>{order_since}</p>
				);
			},
		},
		{
			accessorKey: "customername",
			header: "Customer Name",
			cell: ({ row }) => {
				return <p className="font-semibold">{row.getValue("customername")}</p>;
			},
		},
		{
			accessorKey: "ship_date",
			header: "Ship Date Out",
			cell: ({ row }) => {
				return <p className="font-semibold">{row.getValue("ship_date")}</p>;
			},
		},

		{
			header: "Currency(INT)",
			cell: ({ row }) => {
				const approval_code: any = row.original?.accounts_payment_approval;
				const date: any = new Date(row.original?.accounts_date);
				const account_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				const account_desc: any = row.original?.accounts_payment_desc;
				return (
					<div className="space-y-1">
						<p className="font-semibold">{approval_code}</p>
						<p>{account_date}</p>
						<p>{account_desc}</p>
					</div>
				);
			},
		},
		{
			accessorKey: "ordergroup",
			header: "Invoice Amt(INT)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("ordergroup")}</p>
				</div>
			),
		},
		{
			accessorKey: "orderpriority",
			header: "Paid Amt(INT)",
			cell: ({ row }) => {
				const orderpriority: any = row.getValue("orderpriority");
				const renderSourceValue = () => {
					switch (orderpriority) {
						case "U  ":
							return <div className="capitalize ">Urgent</div>;
						case "F  ":
							return <div className="capitalize ">Fitting</div>;
						case "FRC":
							return <div className="capitalize ">ROF-NC</div>;
						case "FR ":
							return <div className="capitalize ">ROF-C</div>;
						case "N  ":
							return <div className="capitalize ">Normal</div>;
						case "A  ":
							return <div className="capitalize ">Alteration</div>;
						case "R  ":
							return <div className="capitalize ">Remake</div>;
						case "W  ":
							return <div className="capitalize ">Wedding</div>;
						case "CAN":
							return <div className="capitalize ">Cancelled</div>;
						case "VIP":
							return <div className="capitalize ">VIP</div>;
						default:
							return <div className="capitalize">{orderpriority}</div>;
					}
				};
				return renderSourceValue();
			},
		},
		{
			accessorKey: "order_eta",
			header: "Balance Amt(INT)",
			cell: ({ row }) => {
				const date = new Date(row?.getValue("order_eta"));
				const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				return <div className="truncate capitalize">{formattedDate}</div>;
			},
		},
	];

	const table = useReactTable({
		data: alternativeData,
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
		<div className="space-y-2">
			<p className="text-lg font-semibold text-red-500">
				Invoice Amount Total(INT): 0
			</p>
			<BasicDataTable
				table={table}
				columnsLength={columns.length}
				isLoading={false}
			/>
		</div>
	);
};

export default StageDetailTable;
