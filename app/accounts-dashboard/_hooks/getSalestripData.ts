import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useSalestripAccountData = (year:string, salestrip:string) => {
    const salestripAccountData = async () => {
        const baseURL = `https://apivgerprust09.officevg.com/api/erp/sales/order/v2?salestripyear=${year}&salestripname=${salestrip}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer abc123xyz456`
        };

        return await axios.get(baseURL, { headers });
    };

    return useQuery({
        queryFn: salestripAccountData,
        queryKey: ['salestripAccountData', year, salestrip],
    });
};

export default useSalestripAccountData;