import type { SignInFormData, SignUpFormData } from "@/types";
import { handleMessageError } from "@/utils/error";

export const signiIn = async (formData: SignInFormData) => {
  try {
    console.log(formData);
  } catch (error) {
    const message = handleMessageError(error);
    throw new Error(message, { cause: error });
  }
};

export const signUp = async (formData: SignUpFormData) => {
  try {
    console.log(formData);
  } catch (error) {
    const message = handleMessageError(error);
    throw new Error(message, { cause: error });
  }
};
