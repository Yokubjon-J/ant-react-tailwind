import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import storage from "services/storage";
import api from 'services/api';
import queryBuilder from 'services/queryBuilder';

const useGet = ({ 
    url,
    params,
    queryKey,
    method='get',
    onSuccess = () => {},
    onError = () => {},
}) => {
    const token = storage.get("token");

    const data = useQuery({
        queryKey: [queryKey, params],
        queryFn: () => {
            return api[method](queryBuilder(url, params));
        },
        onSuccess: data => onSuccess(data),
        onError: error => onError(error),
    });
    return { ...data };
};

export default useGet;
