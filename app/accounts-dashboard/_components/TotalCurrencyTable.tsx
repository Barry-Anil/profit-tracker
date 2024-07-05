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

const TotalCurrencyTable = ({rowPrice} : {rowPrice: any}) => {
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
				const approval_code: any = row.original?.accounts_currencyint;
				return (
					<div className="space-y-1">
						<p className="font-semibold">{approval_code}</p>
					</div>
				);
			},
		},
		{
			accessorKey: "accounts_invoiceamt_currencyint",
			header: "Invoice Amt(INT)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_invoiceamt_currencyint")}</p>
				</div>
			),
		},
		{
			accessorKey: "accounts_receiptamt_currencyint",
			header: "Paid Amt(INT)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_receiptamt_currencyint")}</p>
				</div>
			),
		},
		{
			accessorKey: "balance",
			header: "Balance Amt(INT)",
			cell: ({ row }) => (
	
				<div className="capitalize w-44">
					<p> {row.getValue("balance")}</p>
				</div>
			),
		},
		{
			accessorKey: "accounts_invoiceamt",
			header: "Invoice Amt(THB)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_invoiceamt")}</p>
				</div>
			),
		},
		{
			accessorKey: "accounts_receiptamt",
			header: "Paid Amt(THB)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_receiptamt")}</p>
				</div>
			),
		},
		{
			accessorKey: "balancethb",
			header: "Balance Amt(THB)",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("balancethb")}</p>
				</div>
			),
		},
	];

	const table = useReactTable({
		data: rowPrice || alternativeData,
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
