import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface DataProviderProps {
    queryKey: string;
    endpoint: string;
    enabled?: boolean;
    utilityFunction?: any;
}

const useDataProvider = ({
    queryKey,
    endpoint,
    enabled,
    utilityFunction
}: DataProviderProps) => {
    const { data: session } = useSession();
    const fetch = async () => {
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL?.concat(endpoint)}`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };

        const res = await axios.get(baseURL, { headers });

        if (res?.data?.apiresponse === "success" && res?.data?.success?.[0]?.code === 200) {
            utilityFunction && utilityFunction(res);
        }
        else {
            // setData(() => ({
            //     clientSession: true
            // })
            // )
            console.log(res?.data?.apiresponse)
        }
        return res;
    };

    return useQuery({
        queryFn: fetch,
        queryKey: [`${queryKey}`],
        enabled: enabled ?? true,
        retry: 2,
    });
};

export default useDataProvider;
