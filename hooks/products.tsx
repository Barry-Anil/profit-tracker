// import useClientSession from '@/store/session';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const useGetAllProducts = () => {
    const { data: session } = useSession();
    // const { setData } = useClientSession();
    const fetchProducts = async () => {
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL}api/fabric-types/products`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };

        const res = await axios.get(baseURL, { headers });
        // if (res?.data?.apiresponse === "error" && res?.data?.error?.[0]?.code === 403) {
        //     setData(() => ({
        //         clientSession: true
        //     })
        //     )
        // }
        return res;
    };

    return useQuery({
        queryFn: fetchProducts,
        queryKey: ['allProducts'],
    });
};

export default useGetAllProducts;
