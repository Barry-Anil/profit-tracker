import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategory = () => {
	const categoryData = async () => {
		const baseURL = "https://apierpr02.officevg.com/refdatatable/category";
        const headerData = {
			searchcriteria: "category",
			q: { category: "Order Processing - Accounts" },
		};

		return await axios.get(baseURL, {
            headers: {
                filtercriteria: JSON.stringify(headerData),
                "Content-Type": "application/json",
            },
        });
	};

	return useQuery({
		queryFn: categoryData,
		queryKey: ["categoryData"],
	});
};

export default useCategory;

