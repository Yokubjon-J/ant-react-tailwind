import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Tooltip, Space } from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import * as Yup from "yup";
import api from 'services/api';
import { useGet, usePost } from "crud";
import { ArrowLeftOutlined  } from '@ant-design/icons';
import ContainerForm from 'modules/container/form'

const validationSchema = Yup.object({
    title: Yup.string().required("Error"),
    description: Yup.string().required("Error"),
    // content: Yup.string().required("Error"),
});

const PostForm = () => {
    const queryClient = useQueryClient();
    const { token } = useSelector((state) => get(state, "auth"));
    const navigate = useNavigate();
    
    // const { mutate: postData, isLoadingPost } = useMutation({
    //   mutationFn: ({ values, resetForm }) => {
    //     console.log('val: ', values)
    //     return api[get(postData.item) ? "put" : "post"](
    //       `/pages${
    //         get(postData, 'item') ? `/${get(postData, 'item.id')}` : ''
    //     }?_l=uz`,
    //       values,
    //     ).then((res) => {
    //       resetForm();
    //     });
    //   },
    //   onSuccess: () => {
    //     setModalData({
    //       // isOpen: false,
    //       item: null,
    //     });
    //     notification.success({
    //       message: "Success created",
    //     });
    //     queryClient.invalidateQueries({ queryKey: ["post"] });
    //   },
    // });
    
    const {mutate: postData} = usePost(
        {
            url: '/pages',
            name: ['post'],
            method: 'post',
            params:{
                extra:{
                    _l :'uz',
                }
            },
            onSuccess: () => {
                notification.success({
                    message: "Success created",
                });
                queryClient.invalidateQueries({ queryKey: ["post"] });
            }
        }
    );
  
    return (
        // <Modal
        //   key={get(propsData, "item.id")}
        // //   open={propsData.isOpen}
        //   footer={false}
        //   title={get(propsData, "item") ? "Update" : "Create"}
        // //   onCancel={() => setpropsData({ isOpen: false, item: null })}
        // >
        <>
            <div style={{margin: "20px", display:'absolute'}}>
                <Space direction="vertical">
                    <Space wrap>
                        <Tooltip title="search">
                            <Button onClick={() => navigate(-1)} type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
                        </Tooltip>
                    </Space>
                </Space>
            </div>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    title: '',
                    description: '',
                    // content: '',
                    status: '',
                }}
                onSubmit={(values, { resetForm }) => {
                    // console.log('hif: ', post)
                    console.log('val: ', values)
                    postData( {
                        url: '/pages',
                        name: ['post'],
                        method: 'post',
                        data: values,
                        params:{
                            extra:{
                                _l :'uz',
                            }
                        },
                        onSuccess: () => {
                            notification.success({
                                message: "Success created",
                            });
                            queryClient.invalidateQueries({ queryKey: ["post"] });
                        }}
                    );
                    resetForm()
                }}
            >
            {({ handleSubmit }) => {
                return (
                    <Form>
                        <Field name="title" label="Title" component={Fields.Input} />
                        <Field
                            name="description"
                            label="Description"
                            component={Fields.Input}
                        />
                        {/* <Field
                          name="content"
                          label="Content"
                          component={Fields.TextArea}
                        /> */}
                        <Field name="status" label="Status" component={Fields.Switch} />
                        <div className="flex justify-end mb-4">
                            <Button type="primary" onClick={handleSubmit}>
                                Create
                            </Button>
                        </div>
                    </Form>
                );
            }}
            </Formik>
        </>
      // </Modal>
    );
};

export default PostForm;
