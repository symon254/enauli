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
import {
  FInput,
  FSelect,
  CSelect,
  FDatePicker,
} from "../../components/Input/cInput";
import { useStateContext } from "../../context/ContextProvider";
import { Formik, Form } from "formik";
import { format } from "date-fns";
import ReactLoading from "react-loading";
import { VehicleSchema } from "../../utils/ValidationSchema";

const Loading = () => (
  <ReactLoading type="bars" color="#20ad4f" height={10} width={30} />
);

const Add = ({ showModal, setShowModal, currentData, tableData }) => {
  const addRef = useRef();
  const dispatch = useDispatch();
  const { currentColor, Options } = useStateContext();

  const initialValues = {
    plateNumber: "",
    saccoId: "",
    seatingCapacity: "",
  };

  const addVehicle = useSelector((state) => state.addVehicle);
  const { loading, error, success } = addVehicle;

  const AuthLogin = useSelector((state) => state.AuthLogin);
  const { userInfo } = AuthLogin;

  const AuthSaccos = useSelector((state) => state.AuthSaccos);
  const { Saccos } = AuthSaccos;

  const saccoData = () => {
    const params = {
      userId: userInfo?.data[0].userId,
    };
    dispatch.AuthSaccos.getSaccos(params);
  };
  useEffect(saccoData, [dispatch]);

  let SaccoOptions = Saccos.map((item) => {
    return {
      value: item.saccoId,
      label: item.name,
    };
  });

  useEffect(() => {
    if (success || error) {
      dispatch.addVehicle.RESET();
    }
  }, [dispatch, success, error, currentData]);

  const onClose = () => {
    setShowModal(false);
    document.getElementById("add-vehicle").reset();
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = {
      saccoId: values.saccoId.value,
      plateNumber: values.plateNumber,
      seatingCapacity: values.seatingCapacity,
    };

    console.log(formData);

    await dispatch.addVehicle.Add(formData);
    setSubmitting(false);
    resetForm(initialValues);
    setShowModal(false);
    tableData();
  };

  return (
    <div>
      <Modal size="regular" active={showModal} toggler={onClose}>
        <ModalHeader toggler={onClose}>Add Vehicle</ModalHeader>

        <Formik
          enableReinitialize
          // innerRef={addRef}
          initialValues={initialValues}
          validationSchema={VehicleSchema}
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
            <Form id="add-vehicle" noValidate>
              <ModalBody>
                <FInput
                  name="plateNumber"
                  type="text"
                  label="Plate Number"
                  placeholder="Plate Number e.g KAB123C"
                  className="uppercase"
                />

                <FInput
                  name="seatingCapacity"
                  type="text"
                  label="Seating Capacity"
                  placeholder="Seating Capacity"
                />

                <FSelect
                  type="text"
                  id="saccoId"
                  label="Sacco"
                  name="saccoId"
                  options={SaccoOptions}
                />
              </ModalBody>

              <ModalFooter>
                <div className="mb-6 flex items-center justify-start">
                  {success && Alert("success", `${success}`)}
                  {error && Alert("error", `${error}`)}
                </div>
                <Button
                  //   size="sm"
                  type="reset"
                  form="add-vehicle"
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
                  form="add-vehicle"
                  color="green"
                  ripple="light"
                  hover={true}
                  disabled={!dirty || isSubmitting}
                >
                  {loading && isSubmitting ? <BtnLoading /> : "Submit"}
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
