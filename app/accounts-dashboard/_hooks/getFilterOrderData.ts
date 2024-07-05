import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFilterOrderData = (year: any, orderPriority : any , accounts_payment_approval:any) => {
	const filteredData = async () => {
		const baseURL = "https://apierp02.officevg.com/sales/orders";
		const headers = {
            "x-access-token": "eyJhb",
            "Content-Type": "application/json",
            Filtercriteria: JSON.stringify({
              searchcriteria: "orderlist_activesalestrip",
              q: {
                salestrip: "",
                ordergrouping: "",
                ordersource: "",
                orderpriority: orderPriority,
                accounts_payment_approval: accounts_payment_approval,
                fabric_issue_status: "",
                prodreg_status: "",
                prod_status: "",
                qa_status: "",
                pkg_status: "",
                year: year
              }
            })
          };

		return await axios.get(baseURL, { headers });
	};

	return useQuery({
		queryFn: filteredData,
		queryKey: ["filteredData", orderPriority, accounts_payment_approval],
	});
};

export default useFilterOrderData;

