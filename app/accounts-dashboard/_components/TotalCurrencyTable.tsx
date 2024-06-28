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

const TotalCurrencyTable = () => {
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
			accessorKey: "invoiceamt",
			header: "Invoice Amt(INT)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("invoiceamt")}</p>
				</div>
			),
		},
		{
			accessorKey: "paidamt",
			header: "Paid Amt(INT)",
			cell: ({ row }) => {
				const orderpriority: any = row.getValue("paidamt");
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
			accessorKey: "balanceamt",
			header: "Balance Amt(INT)",
			cell: ({ row }) => {
				const date = new Date(row?.getValue("balanceamt"));
				const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				return <div className="truncate capitalize">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "invoiceamt_thb",
			header: "Invoice Amt(THB)",
			cell: ({ row }) => {
				const date = new Date(row?.getValue("invoiceamt_thb"));
				const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				return <div className="truncate capitalize">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "paidamt_thb",
			header: "Paid Amt(THB)",
			cell: ({ row }) => {
				const date = new Date(row?.getValue("paidamt_thb"));
				const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				return <div className="truncate capitalize">{formattedDate}</div>;
			},
		},
		{
			accessorKey: "balanceamt_thb",
			header: "Balance Amt(THB)",
			cell: ({ row }) => {
				const date = new Date(row?.getValue("balanceamt_thb"));
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
			<BasicDataTable
				table={table}
				columnsLength={columns.length}
				isLoading={false}
			/>
		</div>
	);
};

export default TotalCurrencyTable;
