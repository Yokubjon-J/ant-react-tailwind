import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

const form = ({ modalData, setModalData }) => {
  const { token } = useSelector((state) => get(state, "auth"));
  const queryClient = useQueryClient();

  const postData = (values) => {
    return axios[get(modalData, "item") ? "put" : "post"](
      `http://api.test.uz/api/v1/admin/banners${
        get(modalData, "item") ? `/${get(modalData, "item.id")}` : ""
      }`,
      values,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const { mutate } = useMutation({
    mutationFn: (values) => postData(values),
    onSuccess: () => {
      setModalData({ isOpen: false, item: null });
      queryClient.invalidateQueries({ queryKey: "banner" });
    },
    onError: (error) => {},
  });

  return (
    <Modal
      title={get(modalData, "item") ? "Добавить" : "Изменить"}
      open={get(modalData, "isOpen")}
      footer={false}
      onCancel={() => setModalData({ isOpen: false, item: null })}
    >
      <Formik
        initialValues={{
          name_uz: get(modalData, "item.name_uz", ""),
          description_uz: get(modalData, "item.description_uz", ""),
        }}
        onSubmit={(values, { resetForm }) => {
          mutate(values);
          resetForm();
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Form className="mt-5">
              <Field name="name_uz" label="Название" component={Fields.Input} />
              <Field
                name="description_uz"
                label="Описание"
                component={Fields.Input}
              />
              <div className="flex justify-end mt-5">
                <Button type="primary" onClick={handleSubmit}>
                  {get(modalData, "item") ? "Добавить" : "Изменить"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default form;
