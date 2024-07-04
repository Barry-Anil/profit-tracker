"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSalestrip from "../_hooks/getSalesTrip";
import SearchOrderNumber from "./SearchOrderNumber";
import SelectSalesTrip from "./SelectSalesTrip";
import SourceFilter from "./SourceFilter";
import StagesTable from "./StagesTable";
import StageDetailTable from "./StageDetailTable";
import TotalCurrencyTable from "./TotalCurrencyTable";
import useStagesTableData from "../_hooks/getStagesTableData";
import useSalestripAccountData from "../_hooks/getSalestripData";
import { useSearchParams } from "next/navigation";

const Wrapper = () => {

	
	const searchParams = useSearchParams()
	const year = searchParams.get('year') || '2024';
	const salestrip = searchParams.get('salestrip') || '';

	const salestripData = useSalestrip();
	const stagesTableData = useStagesTableData(year);

	const { data: dataFilterBySalestrip, isLoading: dataFilterBySalestripLoading } = useSalestripAccountData(year, salestrip);


	return (
		<Card>
			<CardHeader className="bg-primary rounded-t-md text-white">
				<CardTitle className="w-fit">Accounts Dashboard</CardTitle>
			</CardHeader>
			<CardContent className="w-full pt-4 space-y-6">
				<SelectSalesTrip salestripData={salestripData} />
				<SearchOrderNumber />
				<SourceFilter tableData={stagesTableData?.data} />
				<StagesTable stagesTableData={stagesTableData}  />
				<TotalCurrencyTable />
				<StageDetailTable />
			</CardContent>
		</Card>
	);
};

export default Wrapper;
