import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Error"),
  description: Yup.string().required("Error"),
  content: Yup.string().required("Error"),
});

const PostForm = ({ modalData, setModalData, postData = () => {} }) => {
  const queryClient = useQueryClient();
  const { token } = useSelector((state) => get(state, "auth"));

  return (
    <Modal
      key={get(modalData, "item.id")}
      open={modalData.isOpen}
      footer={false}
      title={get(modalData, "item") ? "Update" : "Create"}
      onCancel={() => setModalData({ isOpen: false, item: null })}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          title: get(modalData, "item.title"),
          description: get(modalData, "item.description"),
          content: get(modalData, "item.content"),
          status: get(modalData, "item.status"),
        }}
        onSubmit={(values, { resetForm }) => {
          postData({ values, resetForm });
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
              <Field
                name="content"
                label="Content"
                component={Fields.TextArea}
              />
              <Field name="status" label="Status" component={Fields.Switch} />
              <div className="flex justify-end mb-4">
                <Button type="primary" onClick={handleSubmit}>
                  {get(modalData, "item") ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default PostForm;
