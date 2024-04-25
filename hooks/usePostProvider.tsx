import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type ProviderTypes = {
    method: 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    payload?: any;
};

const usePostProvider = () => {
    const { data: session } = useSession();
    const postData = async ({ method, payload, endpoint }: ProviderTypes) => {
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL?.concat(endpoint)}`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };
        let res = null;
        if (method === 'POST') {
            res = await axios.post(baseURL, payload && payload, { headers });
        } if (method === 'PUT') {
            res = await axios.put(baseURL, payload && payload, { headers });
        } if (method === 'DELETE') {
            res = await axios.delete(baseURL, { headers });
        }
        return res;
    };

    return useMutation({
        mutationFn: postData,
    });
};

export default usePostProvider;
