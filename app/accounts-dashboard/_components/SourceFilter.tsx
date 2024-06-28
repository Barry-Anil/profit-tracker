import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

const SourceFilter = ({ tableData }: { tableData: any }) => {
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
				}}
			>
				All - <span className=""> {tableData?.data?.data?.length}</span>
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
				}}
			>
				Sam Surin -
				<span className="">
					{
						tableData?.data?.data?.filter(
							(item: any) => item?.ordersource?.trim() === "SS",
						)?.length
					}
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
				}}
			>
				Reseller -
				<span className="">
					{
						tableData?.data?.data?.filter(
							(item: any) => item?.ordersource?.trim() === "R",
						)?.length
					}
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
				}}
			>
				Local -
				<span className="">
					{
						tableData?.data?.data?.filter(
							(item: any) => item?.ordersource?.trim() === "L",
						)?.length
					}
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
				}}
			>
				Sam Surin - VIP -
				<span className="">
					{
						tableData?.data?.data?.filter(
							(item: any) => item?.ordersource?.trim() === "SSV",
						)?.length
					}
				</span>
			</Button>
		</div>
	);
};

export default SourceFilter;
