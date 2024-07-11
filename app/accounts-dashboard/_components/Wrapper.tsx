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
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { error } from "console";
import useStagesData from "../_hooks/getStagesData";
import useFilterOrderData from "../_hooks/getFilterOrderData";
import { setDate } from "date-fns";
import useCategory from "../_hooks/getCategoryData";
import useAmountReceived from "../_hooks/getamountReceived";

const Wrapper = () => {

	const [orderData, setOrderData] = useState<any[]>([])

	const searchParams = useSearchParams()
	const year = searchParams.get('year') || '2024';
	const salestrip = searchParams.get('salestrip') || '';
	const ordernumber = searchParams.get('searchOrder') || '';
	const [rowID, setRowID] = useState('');
	const [columnID, setColumnID] = useState('')
	const [columnIdValues, setColumnIdValues] = useState('');
	const [rowIdValues, setRowIdValues] = useState('');
	const [isOrderPriority, setIsOrderPriority] = useState(false)
	const [fabricIssue, setFabricIssue] = useState('')
	const [orderNumberData, setOrderNumberData] = useState<any[]>([])


	const salestripData = useSalestrip();
	const stagesData = useStagesData(year, salestrip);
	const filterData = useFilterOrderData(year, columnID, rowID, salestrip)
	const categoryData = useCategory();
	const amountReceived = useAmountReceived(salestrip, year)

	const [selectedData, setSelectedData] = useState('acc_app_all');
	const [rowPrice, setRowPrice] = useState<any[]>()


	const userDataDetails = async () => {
		const baseURL = "https://apierp02.officevg.com/sales/orders";
		const headers = {
			"x-access-token":
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVDMDA1Iiwic2hvcnRuYW1lIjoiRUMwMDUgICAgICAgICAgIiwiZW1wY29kZSI6IkVDMDA1IiwidXNlcmlkIjoiMTE5NSIsImlhdCI6MTcwOTYzMzM0MywiZXhwIjoxNzA5NjY5MzQzfQ.CIhEYAtW2ey0ylvsdZ0_TMsWbNTDA1zD_9kT25FGXLE",
			"Content-Type": "application/json",
			Filtercriteria: `{"searchcriteria":"ordernumber","q":{"ordernumber":"${ordernumber}"}}`,
		};

		await axios.get(baseURL, { headers }).then((res: any) => setOrderNumberData([res?.data])).catch((error: any) => console.log(error))
	};


	useEffect(() => {
		if (Array.isArray(orderData)) {
			const combineByCurrency = (data: any) => {
				const combinedData = data.reduce((acc: any, item: any) => {
					const {
						accounts_currencyint,
						accounts_invoiceamt_currencyint,
						accounts_receiptamt_currencyint,
						accounts_invoiceamt,
						accounts_receiptamt,
						balancethb,
					} = item;

					// Parse the amounts
					const invoiceAmtCurrencyInt =
						Number.parseFloat(accounts_invoiceamt_currencyint) || 0;
					const receiptAmtCurrencyInt =
						Number.parseFloat(accounts_receiptamt_currencyint) || 0;
					const invoiceAmt = Number.parseFloat(accounts_invoiceamt) || 0;
					const receiptAmt = Number.parseFloat(accounts_receiptamt) || 0;
					const balanceTHB = Number.parseFloat(balancethb) || 0;

					// Initialize the accumulator for the current currency if not already done
					if (!acc[accounts_currencyint]) {
						acc[accounts_currencyint] = {
							accounts_currencyint: accounts_currencyint,
							accounts_invoiceamt_currencyint: 0,
							accounts_receiptamt_currencyint: 0,
							accounts_invoiceamt: 0,
							accounts_receiptamt: 0,
							balancethb: 0,
							balance: 0,
						};
					}

					// Accumulate the invoice and receipt amounts
					acc[accounts_currencyint].accounts_invoiceamt_currencyint +=
						invoiceAmtCurrencyInt;
					acc[accounts_currencyint].accounts_receiptamt_currencyint +=
						receiptAmtCurrencyInt;
					acc[accounts_currencyint].accounts_invoiceamt += invoiceAmt;
					acc[accounts_currencyint].accounts_receiptamt += receiptAmt;
					acc[accounts_currencyint].balancethb += balanceTHB;
					acc[accounts_currencyint].balance =
						acc[accounts_currencyint].accounts_invoiceamt_currencyint -
						acc[accounts_currencyint].accounts_receiptamt_currencyint;

					return acc;
				}, {});

				return Object.values(combinedData);
			};

			const combinedArray = combineByCurrency(orderData);
			setRowPrice(combinedArray);
		}
	}, [orderData]);



	useEffect(() => {
		setOrderData([])
		if (orderNumberData?.length != 0) {

			setOrderData(orderNumberData)
		}
		else {
			setOrderData(filterData?.data?.data)
		}

	}, [filterData?.data, rowID, columnID, orderNumberData])


	console.log(orderNumberData, "order numbeer data")

	return (
		<Card>
			<CardHeader className="bg-primary rounded-t-md text-white">
				<CardTitle className="w-fit">Accounts Dashboard</CardTitle>
			</CardHeader>
			<CardContent className="w-full pt-4 space-y-6">
				<SelectSalesTrip salestripData={salestripData} />
				<SearchOrderNumber userDataDetails={userDataDetails} amountReceived={amountReceived}  />
				<SourceFilter tableData={stagesData} setSelectedData={setSelectedData} />
				<StagesTable
					stagesData={stagesData}
					selectedData={selectedData}
					setColumnID={setColumnID}
					setColumnIdValues={setColumnIdValues}
					setIsOrderPriority={setIsOrderPriority}
					setFabricIssue={setFabricIssue}
					setRowID={setRowID}
					setRowIdValues={setRowIdValues}
				/>
				<TotalCurrencyTable rowPrice={rowPrice} />
				<StageDetailTable 
					orderData={orderNumberData?.length != 0 ? orderNumberData : filterData?.data?.data} 
					rowID={rowID} 
					category={categoryData?.data?.data}
				/>
			</CardContent>
		</Card>
	);
};

export default Wrapper;

