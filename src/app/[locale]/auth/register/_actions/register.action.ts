"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";

export const registerAction = async (
  registrationFields: RegistrationFields
): Promise<APIResponse<RegisterResponse>> => {
  const city = registrationFields.deliveryCity?.trim();
  const street = registrationFields.deliveryStreet?.trim();

  const response = await fetch(`${process.env.API_URL}/users/signup`, {
    method: "POST",
    body: JSON.stringify({
      name: registrationFields.name,
      email: registrationFields.email,
      phone: registrationFields.phone,
      password: registrationFields.password,
      passwordConfirm: registrationFields.passwordConfirm,
      ...(city && street
        ? {
            address: {
              label: registrationFields.deliveryLabel?.trim() || "Home",
              city,
              street,
            },
          }
        : {}),
    }),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: RegisterResponse | ErrorResponse = await response.json();

  if ("status" in payload && (payload.status === "fail" || payload.status === "error")) {
    return {
      status: payload.status,
      message: payload.message,
    };
  }

  return {
    message: "success",
    ...payload,
  };
};
