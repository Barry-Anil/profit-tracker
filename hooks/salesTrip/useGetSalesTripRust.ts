import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const useGetSalesTripRust = (salestripyear: number) => {
    const { data: session } = useSession();

    const getSalesTrip = async () => {
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL}api/salestrip/details?salestripyear=${salestripyear}&salestripname=`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };
        const res = await axios.get(baseURL, { headers });
        console.log(res?.data, 'res?.data');
        return res?.data;
    };

    return useQuery({
        queryFn: getSalesTrip,
        queryKey: ['salesTripsRust', salestripyear],
        refetchOnWindowFocus: false,
        gcTime: 0,
        // enabled: !!parameters?.salestripname,
    });
};

export default useGetSalesTripRust;
