import * as Yup from "yup";

const phoneRegex = RegExp(/^(07|01)[0-9]{8}$/);
const name = RegExp(/^[a-zA-Z '.-]*$/);
const KRA = RegExp(/^[A]{1}[0-9]{9}[a-zA-Z]{1}$/);
const number = RegExp(/^[0-9]*$/);
const passport = RegExp(/^[A-Z]{2}[0-9]{7}$/);

export const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegex, "Phone number format. E.g. 07XXXXXX or 01XXXXXX")
    .min(10, "Too Short!")
    .max(10, "Too Long!"),
  pin: Yup.string()
    .required("Pin is required")
    .matches(number, "Pin must be a numeral")
    .min(4, "Pin must be at least 4 characters")
    .max(4, "Pin must not exceed 4 characters"),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  newPassword: Yup.string()
    .concat(Yup.string().required("Password is required"))
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .when("newPassword", (newPassword, schema) => {
      if (newPassword) return schema.required("Confirm Password is required");
    })
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

export const VehicleSchema = Yup.object().shape({
  saccoId: Yup.object().required("sacco is required"),
  plateNumber: Yup.string()
    .required("plateNumber is required")
    .min(7, "Too Short!")
    .max(7, "Too Long!"),
  seatingCapacity: Yup.string()
    .required("seatingCapacity is required")
    .matches(number, "seatingCapacity must be a numeral"),
  // .min(12, "Too Short!")
  // .max(12, "Too Long!"),
});

export const PaymentSchema = Yup.object().shape({
  narrative: Yup.string(),
  phone: Yup.string()
    .matches(
      phoneRegex,
      "Phone number of the user in INTERNATIONAl format. E.g. 2547XXXXXX or 2541XXXXXX"
    )
    .min(12, "Too Short!")
    .max(12, "Too Long!"),
});

export const AgentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(
      phoneRegex,
      "Phone number of the user in INTERNATIONAl format. E.g. 2547XXXXXX or 2541XXXXXX"
    )
    .min(12, "Too Short!")
    .max(12, "Too Long!")
    .required("Phone number is required"),
  location: Yup.string().required("Location is required"),
  nationalID: Yup.number(),
});

export const DiscountValidation = Yup.object().shape({
  percentage: Yup.number().max(31, "Too Long!").required("Percentage required"),
});
export const StartDateValidation = Yup.object().shape({
  startDate: Yup.date().required("Date required"),
});
