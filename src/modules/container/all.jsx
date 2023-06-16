import React from 'react';
import {useGet} from '../../crud';
import {get} from 'lodash';

const ContainerAll = ({url, queryKey, params, onSuccess, onError, children}) => {
    const data = useGet({url, queryKey, params, onSuccess, onError});
    return children({
        items: get(data, 'data.data.data'),
        ...data,
        meta:{
            total: get(data, 'data.data.total'),
            current: get(data, 'data.data.current_page'),
            last: get(data, 'data.data.last_page'),
            perPage: get(data, 'data.data.per_page'),
        }
    })
};

export default ContainerAll;