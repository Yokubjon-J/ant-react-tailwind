import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Switch,
  Table,
  Tooltip,
  message,
  notification,
} from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Formik } from "formik";
import { get, truncate } from "lodash";
import React, { useState } from "react";
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PostForm from "./form-edit/index";
import { useGet, usePost, useDelete } from "crud";
import { Link } from "react-router-dom";
import ContainerAll from '../../modules/container/all';
import qs from "qs";

const index = () => {
    const { token } = useSelector((state) => get(state, "auth"));
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  
      // const {data, isFetched} = useQuery({ //data is used in Table
      //     queryKey: ['post'],
      //     queryFn: () => {
      //         return axios.get('http://api.test.uz/api/v1/admin/pages?_l=uz', {
      //             headers: {
      //                 Authorization: "Bearer " + token,
      //             }
      //         })
      //     }}
      //     )
  
    const { data, isFetched, isLoading } = useGet({
        url: "/pages",
        queryKey: ["post"],
        params: {
            // limit: 3,
            filter:{},
            sort:'id',
            extra: {
                _l: 'uz',
            },
        },
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error),
      });  
  
    const queryClient = useQueryClient();
  
    const {mutate: deleteHandler} = useDelete({
        url: `/pages`,
        updateKey: ['post'],
        params: {
            extra:{
                _l: 'uz',
            },
        },
        onSuccess: () => {
            message.success("Success");
            queryClient.invalidateQueries({ queryKey: ["post"] });
        }
    })
  
    
    // const { mutate: deleteHandler } = useMutation({
    //   mutationFn: (id) => {
    //     return axios.delete(`http://api.test.uz/api/v1/admin/pages/${id}?_l=uz`, {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     });
    //   },
    //   onSuccess: () => {
    //     message.success("Success");
    //     queryClient.invalidateQueries({ queryKey: ["post"] });
    //   },
    // });
  
    // const { mutate: statusHandler } = useMutation({
  //   mutationFn: ({ id, status }) => {
  //     return axios.put(
  //       `http://api.test.uz/api/v1/admin/pages/updateStatus/${id}?_l=uz`,
  //       { status },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //   },
  //   onSuccess: () => {
  //     message.success("Success");
  //     queryClient.invalidateQueries({ queryKey: ["post"] });
  //   },
    // });
    
    // const { mutate: statusHandler } = usePost({
    //   method: 'put',
    //   onSuccess: () => {
    //     message.success("Success");
    //     queryClient.invalidateQueries({ queryKey: ["post"] });
    //   },
    // });
    return (
        <div>
          <div className="flex justify-end mb-4">
                <Link to='create'>
                    <Button
                        type="primary"
                    >
                        +ADD
                    </Button>
                </Link>
            </div>
            <ContainerAll
                url='/pages'
                queryKey={'post'}
                params={{
                    limit: 5,
                    page: get(params, 'page', 1),
                    extra:{
                        _l:'uz',
                    },
                }}
            >
                {({items, isLoading, isFetched, meta}) => {
                    console.log('nano', meta);
                    return (
                        <>
                            <Table
                                rowKey={"id"}
                                loading={!isFetched}
                                dataSource={items}
                                pagination={{
                                    current: get(params, 'page', 1),
                                    pageSize: +get(meta, 'perPage'),
                                    total: get(meta, 'total'),
                                }}
                                onChange={(page) => {
                                    navigate({
                                        search: qs.stringify({
                                            page: page.current
                                        }),
                                    });
                                    setPage(page.current);
                                }}
                                columns={[
                                {
                                    title: "ID",
                                    dataIndex: "id",
                                    className: "w-[20px]",
                                  
                                },
                                {
                                    title: "Title",
                                    dataIndex: "title",
                                },
                                {
                                    title: "Description",
                                    dataIndex: "description",
                                },
                                // {
                                //   title: "Content",
                                //   dataIndex: "content",
                                //   render: (value) => {console.log('poss: ',value)
                                //     return value.length > 50 ? (
                                //       <Popover title={value}>
                                //         {truncate(value, { length: 50, omission: "..." })}
                                //       </Popover>
                                //     ) : (
                                //       value
                                //     );
                                //   },
                                // },
                                {
                                    title: "Status",
                                    dataIndex: "status",
                                    render: (value, row) => {
                                        // console.log('row data: ', row)
                                        return (
                                            <Switch
                                              loading={!isFetched}
                                              checked={value ? true : false}
                                              onChange={(e) =>
                                                  statusHandler({ id: get(row, "id"), status: e ? 1 : 0 })
                                              }
                                            />
                                        );
                                    },
                                },
                                {
                                  title: "Action",
                                  dataIndex: "id",
                                  render: (_, row) => {
                                    return (
                                      <div className="flex gap-5">
                                        <Tooltip title="Delete">
                                            <Popconfirm
                                                placement="topRight"
                                                description={"Delete"}
                                                onConfirm={() => deleteHandler(get(row, "id"))}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined className="text-red-500 cursor-pointer text-lg" />
                                            </Popconfirm>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                        {/* <Link to='update/:id' state={row}> */}
                                            <EditOutlined
                                                className="text-blue-500 cursor-pointer text-lg"
                                                onClick={() =>
                                                    navigate(`update/${get(row, 'id')}`)
                                                }
                                            />
                                        {/* </Link> */}
                                        </Tooltip>
                                      </div>
                                    );
                                  },
                                },
                                            
                              ]}
                          />
                          {/* <Pagination
                              pageSize={1}
                              total={50}
                          /> */}
                      </>
                  )
              }}
            </ContainerAll>
        
        {/* <PostForm {...{ modalData, setModalData, postData }} /> */}
        </div>
    );
};

export default index;
