import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signIn } from "aws-amplify/auth";
import { SignInSubmitForm } from "../../interfaces/SignInSignUpInterfaces";
import SignInSignUpComponent from "../../sharedComponent/SignInSignUpComponent/SignInSignUpComponent";
import { getUser } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../providers/AppProvider";

const SignInPage: React.FC = () => {
  const intl = useIntl();
  const { refetchCurrentUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const validationSchemaForSignIn = Yup.object().shape({
    email: Yup.string()
      .required(intl.formatMessage({ id: "requiredEmailTitle" }))
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        intl.formatMessage({ id: "validEmailTitle" })
      )
      .email(intl.formatMessage({ id: "validEmailTitle" }))
      .trim(),
    password: Yup.string().required("Password is required"),
  });

  const useFormReturn = useForm<SignInSubmitForm>({
    mode: "all",
    resolver: yupResolver(validationSchemaForSignIn),
  });

  const handleSignIn = async (formData: SignInSubmitForm) => {
    try {
      const { isSignedIn } = await signIn({
        username: formData.email,
        password: formData.password,
      });
      if (isSignedIn) {
        await getUser();
        refetchCurrentUserData();
        navigate("/home");
      }
    } catch (e: unknown) {
      const errorMsg = (e as { message: string })?.message;
      setErrorMessage(errorMsg);
      console.log("error on sign in", errorMsg);
    }
  };
  return (
    <SignInSignUpComponent
      useFormReturn={useFormReturn}
      onSubmit={handleSignIn}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      type="signIn"
    />
  );
};

export default SignInPage;
