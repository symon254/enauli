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
import { AgentSchema } from "../../utils/ValidationSchema";

const Loading = () => (
  <ReactLoading type="bars" color="#20ad4f" height={10} width={30} />
);

const Update = ({ showModal, setShowModal, currentData, tableData }) => {
  const updateVehicleRef = useRef();
  const dispatch = useDispatch();
  const { currentColor, Options } = useStateContext();

  const [initialValues, setInitialValues] = useState({
    saccoId: "",
    plateNumber: "",
    seatingCapacity: "",
  });

  const updateVehicle = useSelector((state) => state.updateVehicle);
  const { loading, error, success } = updateVehicle;

  const AuthLogin = useSelector((state) => state.AuthLogin);
  const { userInfo } = AuthLogin;

  const AuthSaccos = useSelector((state) => state.AuthSaccos);
  const { Saccos } = AuthSaccos;

  let SaccoOptions = Saccos.map((item) => {
    return {
      value: item.saccoId,
      label: item.name,
    };
  });

  useEffect(() => {
    const params = {
      userId: userInfo?.data[0].userId,
    };
    dispatch.AuthSaccos.getSaccos(params);

    if (success || error) {
      dispatch.updateVehicle.RESET();
    }

    if (updateVehicleRef.current) {
      setInitialValues({
        plateNumber: updateVehicleRef.current.setFieldValue(
          "plateNumber",
          currentData.plateNumber ? currentData.plateNumber : ""
        ),
        seatingCapacity: updateVehicleRef.current.setFieldValue(
          "seatingCapacity",
          currentData.seatingCapacity ? currentData.seatingCapacity : ""
        ),

        saccoId: updateVehicleRef.current.setFieldValue(
          "saccoId",
          SaccoOptions &&
            SaccoOptions.find((item) => item?.value === currentData.saccoId)
        ),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success, error, currentData]);

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const params = {
      vehicleId: currentData.vehicleId,
      saccoId: values.saccoId.value,
      plateNumber: values.plateNumber,
      seatingCapacity: values.seatingCapacity,
    };

    console.log(params);

  //  await dispatch.updateVehicle.Update(params);
    setSubmitting(false);
    setShowModal(false);
    tableData();
  };

  return (
    <div>
      <Modal size="regular" active={showModal} toggler={onClose}>
        <ModalHeader toggler={onClose}>Update Vehicle</ModalHeader>

        <Formik
          enableReinitialize
          innerRef={updateVehicleRef}
          initialValues={initialValues}
          // validationSchema={AgentSchema}
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
            <Form id="update-vehicle" noValidate>
              <ModalBody>
                <FInput
                  name="plateNumber"
                  type="text"
                  label="Plate Number"
                  placeholder="Plate Number e.g KAB123C"
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
                  type="button"
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
                  form="update-vehicle"
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

export default Update;
