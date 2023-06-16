import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
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
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PostForm from "./components/form";
import { useGet } from "crud";
import { Link } from "react-router-dom";

const index = () => {
  const { token } = useSelector((state) => get(state, "auth"));
  const [modalData, setModalData] = useState({
    isOpen: false,
    item: null,
  });

  const { data, isFetched } = useGet({
    url: "/posts?_l=uz",
    queryKey: ["post"],
  });

  const queryClient = useQueryClient();

  const { mutate: postData, isLoadingPost } = useMutation({
    mutationFn: ({ values, resetForm }) => {
      return axios[get(modalData, "item") ? "put" : "post"](
        `http://api.test.uz/api/v1/admin/posts${
          get(modalData, "item") ? `/${get(modalData, "item.id")}` : ""
        }?_l=uz`,
        values,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      ).then((res) => {
        resetForm();
      });
    },
    onSuccess: () => {
      setModalData({
        isOpen: false,
        item: null,
      });
      notification.success({
        message: "Success created",
      });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
  const { mutate: deleteHandler } = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://api.test.uz/api/v1/admin/posts/${id}?_l=uz`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: () => {
      message.success("Success");

      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const { mutate: statusHandler } = useMutation({
    mutationFn: ({ id, status }) => {
      return axios.put(
        `http://api.test.uz/api/v1/admin/posts/updateStatus/${id}?_l=uz`,
        { status },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    onSuccess: () => {
      message.success("Success");
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            return setModalData({ isOpen: true, item: null });
          }}
        >
          {/* <Link to='create'>+ADD</Link> */}
          +ADD
        </Button>
      </div>
      <Table
        rowKey={"id"}
        dataSource={get(data, "data.data")}
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
          //   render: (value) => {
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
            render: (value, row) => {console.log('row data: ', row)
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
                  {/* <Link to='create' state={row}> */}
                    <EditOutlined
                      className="text-blue-500 cursor-pointer text-lg"
                      onClick={() =>
                        setModalData({
                          isOpen: true,
                          item: row,
                        })
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
      <PostForm {...{ modalData, setModalData, postData }} />
    </div>
  );
};

export default index;
