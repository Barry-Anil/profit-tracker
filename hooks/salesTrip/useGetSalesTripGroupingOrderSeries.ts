import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetSalesTripGroupingOrderSeries = (id: string) => {
    const getOrderSeries = async () => {
        const baseURL = `https://apierp02.officevg.com/sales/salestrip/getsalestripgrouping`;
        const headers = {
            'Content-Type': 'application/json',
            Filtercriteria: JSON.stringify({ searchcriteria: 'getsalestipseries', q: { salestripid: id } }),
        };

        const res = await axios.get(baseURL, { headers });

        return res?.data;
    };

    return useQuery({
        queryFn: getOrderSeries,
        queryKey: ['getOrderSeries', id],
        enabled: !!id,
    });
};

export default useGetSalesTripGroupingOrderSeries;
