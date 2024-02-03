import { type AxiosInstance } from "axios"
import { type CheckoutResponseSchema, type CheckoutSchema, checkoutUrl as url } from "../resource/icash"
import { checkoutConfig, createAxiosInstance, } from "./axios"

const onCheckout = async (
  values: CheckoutSchema,
  axiosInstance: AxiosInstance
) => {

  const { data, status } = await axiosInstance.post<CheckoutResponseSchema>(
    url,
    values
  )

  return { data, status }

}

export const createCheckoutSession = async (values: CheckoutSchema) => {

  const axiosInstance = createAxiosInstance(checkoutConfig)

  return await onCheckout(values, axiosInstance)

}
