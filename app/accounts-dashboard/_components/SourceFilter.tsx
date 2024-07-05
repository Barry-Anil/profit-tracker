import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

const SourceFilter = ({ tableData, setSelectedData }: { tableData: any , setSelectedData: any}) => {
	const searchParams = useSearchParams();
	const selectedSource = searchParams.get("source") || "All";


	return (
		<div className="mb-4 mt-4 flex flex-wrap gap-4">
			<Button
				className={cn(
					"hover:bg-inherit/80 flex gap-2 bg-slate-200 text-black",
					selectedSource === "All" ? "bg-blue-400 text-white" : "",
				)}
				onClick={() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("source", "All");
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
					setSelectedData("acc_app_all");
				}}
			>
				All - <span className=""> {tableData?.data?.data["acc_app_all"].reduce((acc: any, las: { total_order_count: any; } ) => acc + las.total_order_count, 0) }</span>
			</Button>
			<Button
				className={cn(
					"hover:bg-inherit/80 flex gap-2 bg-slate-200 text-black",
					selectedSource === "SS" ? "bg-blue-400 text-white" : "",
				)}
				onClick={() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("source", "SS");
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
					setSelectedData('acc_app_ss')
				}}
			>
				Sam Surin -
				<span className="">
				{tableData?.data?.data["acc_app_ss"].reduce((acc: any, las: { total_order_count: any; } ) => acc + las.total_order_count, 0)}
				</span>
			</Button>
			<Button
				className={cn(
					"hover:bg-inherit/80 flex gap-2 bg-slate-200 text-black",
					selectedSource === "R" ? "bg-blue-400 text-white" : "",
				)}
				onClick={() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("source", "R");
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
					setSelectedData('acc_app_reseller')
				}}
			>
				Reseller -
				<span className="">
				{tableData?.data?.data["acc_app_reseller"].reduce((acc: any, las: { total_order_count: any; } ) => acc + las.total_order_count, 0)}
				</span>
			</Button>
			<Button
				className={cn(
					"hover:bg-inherit/80 flex gap-2 bg-slate-200 text-black",
					selectedSource === "L" ? "bg-blue-400 text-white" : "",
				)}
				onClick={() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("source", "L");
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
					setSelectedData('acc_app_local')
				}}
			>
				Local -
				<span className="">
				{tableData?.data?.data["acc_app_local"].reduce((acc: any, las: { total_order_count: any; } ) => acc + las.total_order_count, 0)}
				</span>
			</Button>
			<Button
				className={cn(
					"hover:bg-inherit/80 flex gap-2 bg-slate-200 text-black",
					selectedSource === "SSV" ? "bg-blue-400 text-white" : "",
				)}
				onClick={() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("source", "SSV");
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
					setSelectedData('acc_app_ssvip')
				}}
			>
				Sam Surin - VIP -
				<span className="">
				{tableData?.data?.data["acc_app_ssvip"].reduce((acc: any, las: { total_order_count: any; } ) => acc + las.total_order_count, 0)}
				</span>
			</Button>
		</div>
	);
};

export default SourceFilter;
