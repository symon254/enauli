import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../components/Modal/Modal";
import { Alert, Message, Notification } from "../../components/Alert";
import { Button, BtnLoading } from "../../components/Button";
import { FInput, FSelect, FDatePicker } from "../../components/Input/cInput";
import { Formik, Form } from "formik";
import { format } from "date-fns";
import ReactLoading from "react-loading";
import { AgentSchema } from "../../utils/ValidationSchema";

const Loading = () => (
  <ReactLoading type="bars" color="#20ad4f" height={10} width={30} />
);

const Add = ({ showModal, setShowModal, currentData, tableData }) => {
  const addRef = useRef();
  // const dispatch = useDispatch();

  const initialValues = {
    phone: "",
    name: "",
    idNumber: "",
    nextKinName: "",
    nextKinPhone: "",
  };

  // const AddAgent = useSelector((state) => state.AddAgent);
  // const { loading, error, success } = AddAgent;

  // useEffect(() => {
  //   if (success || error) {
  //     dispatch.AddAgent.ADD_AGENT_RESET();
  //   }
  // }, [dispatch, success, error, currentData]);

  const onClose = () => {
    setShowModal(false);
    document.getElementById("add-cover").reset();
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const formData = {
      phone: values.phone,
      name: values.name,
      idNumber: values.idNumber,
      nextKinName: values.nextKinName,
      nextKinPhone: values.nextKinPhone,
    };

    console.log(formData);

    // await dispatch.AddAgent.Add(formData);
    setSubmitting(false);
    setShowModal(false);
    tableData();
  };

  return (
    <div>
      <Modal size="regular" active={showModal} toggler={onClose}>
        <ModalHeader toggler={onClose}>New Trip</ModalHeader>

        <Formik
          enableReinitialize
          // innerRef={addRef}
          initialValues={initialValues}
          validationSchema={AgentSchema}
          validateOnBlur={true}
          onSubmit={onSubmit}
          onReset={onClose}
        >
          {({
            values,
            errors,
            dirty,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form id="add-cover" noValidate>
              <ModalBody>
                <FInput
                  name="name"
                  type="text"
                  label="Passenger Name"
                  placeholder="Passenger Name"
                />

                <FInput
                  name="idNumber"
                  type="text"
                  label="Passenger ID Number"
                  placeholder="Passenger ID Number"
                />

                <FInput
                  name="phone"
                  type="text"
                  label="Passenger Phone Number"
                  placeholder="Phone Number e.g 254"
                />

                <FInput
                  name="nextKinName"
                  type="text"
                  label="Next Of Kin Name"
                  placeholder="Next Of Kin Name"
                />

                <FInput
                  name="nextKinPhone"
                  type="text"
                  label="Next Of Kin Phone Number"
                  placeholder="Phone Number e.g 254"
                />
              </ModalBody>

              <ModalFooter>
                <div className="mb-6 flex items-center justify-start">
                  {/* {loading && <Loading />} */}
                  {/* {success && Alert("success", `${success}`)}
                  {error && Alert("error", `${error}`)} */}
                </div>
                <Button
                  //   size="sm"
                  type="reset"
                  form="add-cover"
                  color="red"
                  ripple="dark"
                  buttonType="filled"
                  onClick={onClose}
                  hover={true}
                >
                  Close
                </Button>

                <Button
                  //   size="sm"
                  type="submit"
                  form="add-cover"
                  color="green"
                  ripple="light"
                  hover={true}
                  disabled={!dirty || isSubmitting}
                >
                  Submit
                  {/* {loading && isSubmitting ? <BtnLoading /> : "Submit"} */}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Add;
