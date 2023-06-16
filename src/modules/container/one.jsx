import { useGet } from "crud";
import { get } from "lodash";
import React from "react";

const ContainerOne = ({
  url,
  queryKey,
  params,
  onSuccess,
  onError,
  children,
}) => {
  const data = useGet({ url, queryKey, params, onSuccess, onError });
  return children({ item: get(data, "data.data"), ...data });
};

export default ContainerOne;
