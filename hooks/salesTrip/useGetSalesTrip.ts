import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetSalesTrip = (criteria: string, parameters: any) => {
    const getSalesTrip = async () => {
        const baseURL = `https://apierp02.officevg.com/sales/salestrip`;
        const headers = {
            'Content-Type': 'application/json',
            Filtercriteria: JSON.stringify({ searchcriteria: criteria, q: parameters }),
        };
        const res = parameters?.salestripname === '' ? { data: [] } : await axios.get(baseURL, { headers });
        return res?.data;
    };

    return useQuery({
        queryFn: getSalesTrip,
        queryKey: ['salesTrip', parameters],
        refetchOnWindowFocus: false,
        // enabled: !!parameters?.salestripname,
    });
};

export default useGetSalesTrip;
