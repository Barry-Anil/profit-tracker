import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type SelectSalesTripProps = {
	salestripData: any;
};

const SelectSalesTrip = ({ salestripData }: SelectSalesTripProps) => {
	const searchParams = useSearchParams();
	const year = searchParams.get("year") || "";
	const salesTrip = searchParams.get("salestrip") || "";

	const filteredData = salestripData?.data?.data?.filter((item: any) => {
		const yearFromDate = new Date(item.createdAt).getFullYear();
		return yearFromDate === Number(year);
	});

	useEffect(() => {
		if (!year) {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set("year", "2024");
			window.history.replaceState(
				{},
				document.title,
				`?${searchParams.toString()}`,
			);
		}
	}, []);

	return (
		<div className="flex items-center gap-4">
			<p className="text-base font-medium">Select Year</p>
			<Select
				onValueChange={(e) => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("year", e);
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
				}}
				value={year || ""}
			>
				<SelectTrigger className="w-[240px]">
					<SelectValue placeholder="Select Year" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="2024">2024</SelectItem>
					<SelectItem value="2023">2023</SelectItem>
					<SelectItem value="2022">2022</SelectItem>
					<SelectItem value="2021">2021</SelectItem>
					<SelectItem value="2020">2020</SelectItem>
					<SelectItem value="2019">2019</SelectItem>
					<SelectItem value="2018">2018</SelectItem>
					<SelectItem value="2017">2017</SelectItem>
					<SelectItem value="2016">2016</SelectItem>
					<SelectItem value="2015">2015</SelectItem>
				</SelectContent>
			</Select>
			<p className="text-base font-medium">Select Salestrip</p>
			<Select
				onValueChange={(e) => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("salestrip", e);
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
				}}
				value={salesTrip || ""}
			>
				<SelectTrigger className="w-[240px]">
					<SelectValue placeholder="Select Salestrip" />
				</SelectTrigger>
				<SelectContent>
					{filteredData?.length > 0 ? (
						filteredData.map((item: any) => (
							<SelectItem value={item.salestrip_name} key={item.salestrip_name}>
								{item.salestrip_name}
							</SelectItem>
						))
					) : (
						<SelectItem value="0">No Data for Selected Year </SelectItem>
					)}
				</SelectContent>
			</Select>
			<Button
				variant="secondary"
				className="bg-slate-200"
				onClick={() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("salestrip", "");
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
				}}
			>
				Clear Sales Trip
			</Button>
		</div>
	);
};

export default SelectSalesTrip;
