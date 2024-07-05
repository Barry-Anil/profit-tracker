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
import { ArrowUpDown, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UpdateEdit from "./UpdateEdit";
const alternativeData: any[] = [];

const StageDetailTable = ({orderData, rowID} : {orderData : any, rowID: any}) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

    const [approveButtonColor, setApproveButtonColor] = React.useState('');
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const searchParams = useSearchParams();
	const ordernumber = searchParams.get('searchOrder') || '';



	const columns: ColumnDef<any>[] = [
		{
			id: "select",
			header: "Action",
			cell: ({ row }) => {
				if (rowID === 'Partial Completed') {
				    setApproveButtonColor('text-yellow-800 border border-yellow-500');
				}

				if (rowID === 'Cutting') {
				    setApproveButtonColor('text-red-500 border border-red-500');
				}

				if (rowID === 'Pending Accounts Approval') {
				    setApproveButtonColor('text-red-500 border border-red-500');
				}

				if (rowID === 'Completed') {
				    setApproveButtonColor('text-green-800 border border-green-500');
				}

				// console.log(approveButtonColor, 'approveButtonColor');
				return (
					<div className="flex gap-2">
                        <Button variant="link" className={`text-base ${approveButtonColor}`}>
                            Approve Account Approval <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
						<UpdateEdit row={row} />
					</div>
				);
			},
		},
		{
			accessorKey: "accounts_payment_desc",
			header: "Approval Code",
			cell: ({ row }) => {
				return <p className="font-semibold">{row.getValue("accounts_payment_desc")}</p>;
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
					String(row?.original.orderdate)?.slice(0, 24),
				);
				const today_date = new Date();
				const order_since = Math.ceil(
					(today_date.getTime() - formatted_date.getTime()) /
						(1000 * 60 * 60 * 24),
				);

	
				return (
	
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
			accessorKey: "order_eta",
			header: "Ship Date Out",
			cell: ({ row }) => {
				const date = new Date(row?.getValue("order_eta"));
				const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
				return <div className="truncate capitalize">{formattedDate}</div>;
			},
		},

		{
			header: "Currency(INT)",
			accessorKey: "accounts_currencyint",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_currencyint")}</p>
				</div>
			),
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
			accessorKey: "order_eta",
			header: "Balance Amt(INT)",
			cell: ({ row }) => {

				const balance =  Math.ceil((row.getValue("accounts_invoiceamt_currencyint") as number ) - (row.getValue("accounts_receiptamt_currencyint") as number)).toFixed(2);
				return <div className="capitalize w-44">{balance}</div>
			},
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
			// cell: ({ row }) => {
			// 	const orderpriority: any = row.getValue("orderpriority");
			// 	const renderSourceValue = () => {
			// 		switch (orderpriority) {
			// 			case "U  ":
			// 				return <div className="capitalize ">Urgent</div>;
			// 			case "F  ":
			// 				return <div className="capitalize ">Fitting</div>;
			// 			case "FRC":
			// 				return <div className="capitalize ">ROF-NC</div>;
			// 			case "FR ":
			// 				return <div className="capitalize ">ROF-C</div>;
			// 			case "N  ":
			// 				return <div className="capitalize ">Normal</div>;
			// 			case "A  ":
			// 				return <div className="capitalize ">Alteration</div>;
			// 			case "R  ":
			// 				return <div className="capitalize ">Remake</div>;
			// 			case "W  ":
			// 				return <div className="capitalize ">Wedding</div>;
			// 			case "CAN":
			// 				return <div className="capitalize ">Cancelled</div>;
			// 			case "VIP":
			// 				return <div className="capitalize ">VIP</div>;
			// 			default:
			// 				return <div className="capitalize">{orderpriority}</div>;
			// 		}
			// 	};
			// 	return renderSourceValue();
			// },
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_receiptamt")}</p>
				</div>
			),
		},
		{
			accessorKey: "order_eta",
			header: "Balance Amt(THB)",
			cell: ({ row }) => {

				const balance =  Math.ceil((row.getValue("accounts_invoiceamt") as number) - (row.getValue("accounts_receiptamt") as number)).toFixed(2);
				return <div className="capitalize w-44">{balance}</div>
			},
		},
		{
			accessorKey: "ordertakenby_shortname",
			header: "Order Taken By",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("ordertakenby_shortname")}</p>
				</div>
			),
		},
		{
			accessorKey: "ordermeasuredby_shortname",
			header: "Order Measured By",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("ordermeasuredby_shortname")}</p>
				</div>
			),
		},
		{
			accessorKey: "fabric_issue_status",
			header: "Fabric Status",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("fabric_issue_status")}</p>
				</div>
			),
		},
		{
			accessorKey: "accounts_user",
			header: "Approved By",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_user")}</p>
				</div>
			),
		},
		{
			accessorKey: "accounts_payment_approval",
			header: "Approved Status",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("accounts_payment_approval")}</p>
				</div>
			),
		},
		{
			accessorKey: "",
			header: "Order Items and Notes",
			cell: ({ row }) => {
				console.log(row?.original, "row original")
                return (
                    <Table className="rounded-md border">
                        <TableHeader className="truncate bg-slate-100">
                            <TableHead className="text-black p-2">Item</TableHead>
                            <TableHead className="text-black p-2">Order</TableHead>
                            <TableHead className="text-black p-2">Ready</TableHead>
                            <TableHead className="text-black p-2">Not Ready</TableHead>
                        </TableHeader>

                        <TableBody className="p-2">
                            {row?.original?.item_current_status?.map((product: any, index: number) => (
                                <TableRow
                                    className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800 ' : 'bg-gray-100   dark:bg-black '} dark:hover:bg-gray-600 hover:bg-gray-200`}
                                    key={`${row.id}-${product.productshortname}`}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    <TableCell className="p-2">{product.productshortname}</TableCell>
                                    <TableCell className="p-2">{product.count}</TableCell>
                                    <TableCell className="p-2">{product.count}</TableCell>
                                    <TableCell className="p-2">0</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
            },
		},
		{
			accessorKey: "ordergroup",
			header: "Grouping",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("ordergroup")}</p>
				</div>
			),
		},
		{
			accessorKey: "orderpriority",
			header: "Priority",
			cell: ({ row }) => (
				<div className="capitalize w-44">
					<p> {row.getValue("orderpriority")}</p>
				</div>
			),
		},
	];

	const table = useReactTable({
		data: orderData || alternativeData,
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
