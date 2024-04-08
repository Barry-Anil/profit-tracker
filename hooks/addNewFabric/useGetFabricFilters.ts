import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const useFabricFilters = () => {
    const { data: session } = useSession();
    const fabricFilters = async () => {
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL}api/fabric/erp/search-params`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };

        return await axios.get(baseURL, { headers });
    };

    return useQuery({
        queryFn: fabricFilters,
        queryKey: ['fabricFilters'],
    });
};

export default useFabricFilters;
