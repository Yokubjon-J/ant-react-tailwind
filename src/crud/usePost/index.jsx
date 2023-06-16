// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import storage from "services/storage";
// import api from 'services/api';
// import queryBuilder from 'services/queryBuilder';

// const usePost = ({ 
//     url,
//     params,
//     name,
//     method='post',
//     onSuccess = () => {},
//     onError = () => {},
// }) => {
//     const token = storage.get("token");

//     const data = useMutation({
//         mutationKey: name,
//         mutationFn: ({values}) => {
//             return api[method](queryBuilder(url, params), values)
//         },
//         onSuccess: data => onSuccess(data),
//         onError: error => onError(error),
//     });
//     return { ...data };
// };

// export default usePost;


import { useMutation } from "@tanstack/react-query";
import api from 'services/api';
import queryBuilder from 'services/queryBuilder';

async function postData({
	url='/pages',
	data,
	params,
	method = "post",
	onSuccess = () => {},
	onError = () => {},
}){
	console.log(9, data);
	return await api[method](queryBuilder(url, params), data)
		.then(data => {
			onSuccess(data);
		})
		.catch(error => {
			onError(error);
		});
}

const usePost = () => {
	return useMutation(postData);
};

export default usePost;
