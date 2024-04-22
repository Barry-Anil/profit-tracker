import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetYear = () => {
    const getYear = async () => {
        const baseURL = `https://apierp02.officevg.com/sales/salestrip/year`;
        const headers = {
            'Content-Type': 'application/json',
        };

        const res = await axios.get(baseURL, { headers });
        return res?.data;
    };

    return useQuery({
        queryFn: getYear,
        queryKey: ['year'],
        staleTime: Infinity,
    });
};

export default useGetYear;
