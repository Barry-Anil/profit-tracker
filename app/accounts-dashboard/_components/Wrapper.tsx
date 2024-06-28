"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSalestrip from "../_hooks/getSalesTrip";
import SearchOrderNumber from "./SearchOrderNumber";
import SelectSalesTrip from "./SelectSalesTrip";
import SourceFilter from "./SourceFilter";
import StagesTable from "./StagesTable";
import StageDetailTable from "./StageDetailTable";
import TotalCurrencyTable from "./TotalCurrencyTable";

const Wrapper = () => {
	const salestripData = useSalestrip();
	return (
		<Card>
			<CardHeader className="bg-primary rounded-t-md text-white">
				<CardTitle className="w-fit">Accounts Dashboard</CardTitle>
			</CardHeader>
			<CardContent className="w-full pt-4 space-y-6">
				<SelectSalesTrip salestripData={salestripData} />
				<SearchOrderNumber />
				<SourceFilter tableData={[]} />
				<StagesTable />
				<TotalCurrencyTable />
				<StageDetailTable />
			</CardContent>
		</Card>
	);
};

export default Wrapper;
