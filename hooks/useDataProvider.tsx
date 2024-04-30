import useClientSession from '@/store/session';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface DataProviderProps {
    querykey: string[];
    endpoint: string;
    enabled?: boolean;
    utilityFunction?: (res: any) => void;
}

const useDataProvider = ({
    querykey,
    endpoint,
    enabled,
    utilityFunction
}: DataProviderProps) => {
    const { data: session } = useSession();

    const { setData } = useClientSession()
    const fetch = async () => {
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL?.concat(endpoint)}`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };

        const res = await axios.get(baseURL, { headers });

        if (res?.data?.apiresponse === "success" && res?.data?.success?.[0]?.code === 200) {
            setData(() => ({
                clientSession: false
            }))
            utilityFunction && utilityFunction(res);
        }
        if (res?.data?.apiresponse === "error" && res?.data?.error?.[0]?.code === 403 && res?.data?.error?.[0]?.token_status === "expired") {
            setData(() => ({
                clientSession: true
            })
            )
        }
        return res;
    };

    return useQuery({
        queryFn: fetch,
        queryKey: querykey,
        enabled: enabled ?? true,
        retry: 2,
    });
};

export default useDataProvider;
