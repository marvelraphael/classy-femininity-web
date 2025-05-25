// pages/api/checkout.js
import { Checkout } from '@polar-sh/nextjs'

export default Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  planId:      process.env.POLAR_MONTHLY_PLAN_ID,
  successUrl:  `${process.env.NEXT_PUBLIC_APP_URL}/reader?book=1`,
  cancelUrl:   `${process.env.NEXT_PUBLIC_APP_URL}/reader?book=1`
})
