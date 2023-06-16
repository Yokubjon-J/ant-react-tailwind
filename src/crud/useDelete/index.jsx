import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import storage from "services/storage";
import api from 'services/api';
import queryBuilder from 'services/queryBuilder';

const useDelete = ({
    url,
    name,
    params,
    updateKey = '',
    onSuccess = () => {},
    onError = () => {},
}) => {
    // const token = storage.get("token");
    const data = useMutation({
        mutationKey: name,
        mutationFn: (id) => api.delete(queryBuilder(`${url}/${id}`, params)),
        onSuccess: data => {
            onSuccess(data);
            if (updateKey) queryClient.invalidateQueries({ queryKey: updateKey });
        },
        onError: error => onError(error),
    });
    return data;
};

export default useDelete;
