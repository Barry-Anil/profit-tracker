import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAmountReceived = (selectedSalestrip: any, selectedYear: any) => {
	const amountReeceived = async () => {
		const baseURL = "https://apierp02.officevg.com/sales/orders";
        const headers = {
            Filtercriteria: JSON.stringify({
              searchcriteria: "orderlist_activesalestrip",
              q:  {
                salestrip: selectedSalestrip,
                ordergrouping: "",
                ordersource: "",
                orderpriority: "",
                accounts_payment_approval: "",
                fabric_issue_status: "",
                prodreg_status: "",
                prod_status: "",
                qa_status: "",
                pkg_status: "",
                year: selectedYear,
            }
            })
          };


		return await axios.get(baseURL, { headers });
	};

	return useQuery({
		queryFn: amountReeceived,
		queryKey: ["amountReeceived", selectedYear, selectedSalestrip ],
	});
};

export default useAmountReceived;

