import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useStagesTableData = () => {
    const stagesTableData = async () => {
        const baseURL = 'https://apierp02.officevg.com/sales/orders';
        const headers = {
            'Content-Type': 'application/json',
            Filtercriteria: JSON.stringify({
                searchcriteria: 'orderlist_activesalestrip',
                q: {
                    salestrip: '',
                    ordergrouping: '',
                    ordersource: '',
                    orderpriority: '',
                    accounts_payment_approval: '',
                    fabric_issue_status: '',
                    prodreg_status: '',
                    prod_status: '',
                    qa_status: '',
                    pkg_status: '',
                    year: 2024,
                },
            }),
        };

        return await axios.get(baseURL, { headers });
    };

    return useQuery({
        queryFn: stagesTableData,
        queryKey: ['stagesTableData'],
    });
};

export default useStagesTableData;
