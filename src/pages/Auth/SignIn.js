import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FInput } from "../../components/Input/cInput";
import { Formik, Form } from "formik";
import { LoginSchema } from "../../utils/ValidationSchema";
import ReactLoading from "react-loading";

const Loading = () => (
    <ReactLoading type="bars" color="#20ad4f" height={10} width={30} />
);

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        phone: "",
        pin: "",
    };

    const dispatch = useDispatch();

    const AuthLogin = useSelector((state) => state.AuthLogin);
    const { loading, error, userInfo } = AuthLogin;

    useEffect(() => {
        if (userInfo?.success) {
            navigate("/dashboard");
        }
    }, [navigate, userInfo]);

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = {
            phone: values.phone,
            pin: values.pin,
        };

        await dispatch.AuthLogin.login(formData);
        setSubmitting(false);
        resetForm(initialValues);
    };

    return (
        <div className="themeBackground app-border-white bg-neutral-200 flex min-h-screen items-center p-6">
            <div className="mx-auto h-full max-w-4xl flex-1 overflow-hidden ">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-fit w-fit flex items-center justify-center md:h-auto md:w-1/2">
                        <span className="bg-light-logo dark:bg-dark-logo h-full bg-contain bg-center bg-repeat-y"></span>
                    </div>
                    <main className="themeSideBackground themeText flex items-center justify-center rounded-xl bg-white p-6 shadow-lg sm:p-12 md:w-full">
                        <div className="w-full">
                            <div className="flex origin-center items-center justify-center align-middle  duration-300 ease-in">
                                <h1 className="text-2xl">
                                    <span className="font-bold">E</span>nauli{" "}
                                    <span className="font-bold">I</span>nsurance{" "}
                                    <span className="font-bold"> M</span>
                                    anagement
                                </h1>
                            </div>

                            <p className="text-center text-sm">
                                Sign in to your account
                            </p>
                            <span className="flex items-center justify-center text-sm">
                                {loading && <Loading />}
                                {error && <Message>{error}</Message>}
                            </span>
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                validationSchema={LoginSchema}
                                validateOnBlur={true}
                                onSubmit={onSubmit}
                            >
                                {({ handleBlur, isSubmitting }) => (
                                    <Form
                                        id="login-User"
                                        className="flex flex-col pt-2 md:pt-8"
                                    >
                                        <FInput
                                            type="text"
                                            name="phone"
                                            label="Phone Number"
                                            placeholder="Enter Phone Number"
                                        />

                                        <FInput
                                            type="password"
                                            name="pin"
                                            label="Pin"
                                            placeholder="Enter Pin"
                                        />

                                        <hr className="my-8" />

                                        <div className="flex flex-row justify-between">
                                            <Button
                                                type="submit"
                                                form="login-User"
                                                color="green"
                                                buttonType="filled"
                                                size="regular"
                                                ripple="light"
                                                className="font-semibold"
                                                hover={true}
                                                block={true}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Login;
