import * as Yup from 'yup';

export const basicValidatorSchema = Yup.object().shape({
    firstname: Yup.string().required("first name is required"),
    lastname: Yup.string().required("last name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.number().typeError("Phone number must be number").min(10, "phone number must be of 10 digits"),
    address_one: Yup.string().required("address is required"),
    address_two: Yup.string().notRequired(),
    city: Yup.string().required(" City is required "),
    state: Yup.string().required(" State is required"),
    zip_code: Yup.number().typeError("Zip code must be number").
    min(6, "zip code mustbe of 6 digits").
    required("Zip code is reuired")
});

export const personalValidatorSchema = Yup.object().shape({
    dob: Yup.date().required("date of birth is required").max(new Date(),"Date of birth must be in the past"),
    gender: Yup.string().required("gender is required"),
    marital_status: Yup.string().notRequired(),
    social_security: Yup.number().typeError(" Social Security number must be in numbers ").notRequired(),
    social: Yup.string().notRequired(),
    kids: Yup.number().typeError("number of kids must be number").notRequired()
});