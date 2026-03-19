"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";

export const registerAction = async (
  registrationFields: RegistrationFields
): Promise<APIResponse<RegisterResponse>> => {
  const response = await fetch(`${process.env.API_URL}/users/signup`, {
    method: "POST",
    body: JSON.stringify({
      name: registrationFields.name,
      email: registrationFields.email,
      phone: registrationFields.phone,
      password: registrationFields.password,
      passwordConfirm: registrationFields.passwordConfirm,
    }),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: RegisterResponse | { message: string; code: number } =
    await response.json();

  // If there's an error (has code property), return it in the expected format
  if ("code" in payload) {
    return {
      message: payload.message,
      code: payload.code,
    };
  }

  // If response has status 200, it's a success
  if ("status" in payload && payload.status === 200) {
    return {
      message: "success",
      ...payload,
    };
  }

  // Return the successful response wrapped in APIResponse format
  return {
    message: "success",
    ...payload,
  };
};
