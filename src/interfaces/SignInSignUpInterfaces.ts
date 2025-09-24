import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface SignUpSubmitForm extends SignInSubmitForm {
  confirm_password: string;
}
export interface SignInSubmitForm {
  email: string;
  password: string;
}

export interface SignInSignUpComponentProps<T extends FieldValues> {
  useFormReturn: UseFormReturn<T, any, any>;
  onSubmit: (formData: T) => Promise<void>;
  type: PageType;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export type PageType = 'signIn' | 'signUp';
