"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";

export const registerAction = async (
  registrationFields: RegistrationFields,
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

  // A rate-limited or failed request may not answer with the usual JSON shape.
  const payload: (RegisterResponse & { message?: string }) | ErrorResponse | null = await response
    .json()
    .catch(() => null);

  if (!response.ok || !payload) {
    return {
      status: response.status >= 500 ? "error" : "fail",
      message: payload?.message ?? "Registration failed. Please try again.",
    };
  }

  return {
    ...(payload as RegisterResponse),
    message: "success",
  };
};
