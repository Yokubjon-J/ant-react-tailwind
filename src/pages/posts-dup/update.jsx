import React from 'react';
import ContainerForm from "modules/container/form";
import ContainerOne from 'modules/container/one';
import { Button, Modal, Tooltip, Space, Spin } from "antd";
import { ArrowLeftOutlined  } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import {get} from 'lodash';
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object({
//     title: Yup.string().required("Error"),
//     description: Yup.string().required("Error"),
//     content: Yup.string().required("Error"),
// });

const Update = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    return (
        <ContainerOne
            url={`/pages/${id}`}
            params={{
                extra: {
                    _l:'uz',
                }
            }}
        >
            {({item, isLoading}) => {
                console.log(99, item)
                return (
                <>
                    {!isLoading ? (
                        <>
                            <div style={{margin: "0 0 20px 0", display:'absolute'}}>
                                <Space direction="vertical">
                                    <Space wrap>
                                        <Tooltip title="search">
                                            <Button onClick={() => navigate(-1)} type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
                                        </Tooltip>
                                    </Space>
                                </Space>
                            </div>
                            <ContainerForm
                                url='/pages'
                                method='post'
                                params={{}}
                                onSuccess={(data, resetForm) => {}}    
                                fields={[
                                    {
                                        name: 'title',
                                        value: get(item.data, 'title'),
                                        type: 'string',
                                        required: true
                                    },
                                    {
                                        name: 'status',
                                        value: get(item.data, 'status') === 1 ? true : false,
                                        type: 'boolean',
                                        onSubmitValue: value => value ? 1 : 0
                                    },
                                    {
                                        name: 'description',
                                        value: get(item.data, 'description'),
                                        type: 'string',
                                        max: 100,
                                        min: 3
                                    },
                                ]}
                            >                    
                                {({ values, errors, handleSubmit }) => {
                                    return (
                                        <>
                                            <Field name="title" label="Title" component={Fields.Input} />
                                            <Field
                                                name="description"
                                                label="Description"
                                                component={Fields.Input}
                                            />
                                            <Field name="status" label="Status" component={Fields.Switch} />
                                            <div className="flex justify-end mb-4">
                                                <Button type="primary" onClick={handleSubmit}>
                                                    Update
                                                </Button>
                                            </div>
                                        </>
                                    );
                                }}
                                                </ContainerForm>
                                                {/* <Formik
                                validationSchema={validationSchema}
                                initialValues={{
                                    title: get(item.data, "title"),
                                    description: get(item.data, "description"),
                                    status: get(item.data, "status"),
                                }}
                                onSubmit={(values, { resetForm }) => {}}
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
                                            <Field name="status" label="Status" component={Fields.Switch} />
                                            <div className="flex justify-end mb-4">
                                                <Button type="primary" onClick={handleSubmit}>
                                                    Update
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }}
                                                </Formik> */}
                                            </>
                                        ) : <Spin/>}
                                    </>
                                    );
            }}
        </ContainerOne>
    )
}

export default Update