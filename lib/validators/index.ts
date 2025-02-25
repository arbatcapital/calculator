import { z } from "zod";

export const businessInfoFormSchema = z.object({
  businessType: z.string().min(2, "Please select an option"),
  businessName: z.string().min(2, "Business name must be atleast 2 characters"),
  fundingAmount: z.string().min(2, "Please select an option"),
  fundingReason: z.string().min(2, "Please select an option"),
  businessStartMonth: z
    .string()
    .regex(/^\d{1,2}$/, "Enter a valid month (1-12).")
    .transform((value) => parseInt(value))
    .refine(
      (month) => month >= 1 && month <= 12,
      "Month must be between 1 & 12"
    )
    .transform((value) => String(value)),

  businessStartYear: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid 4 digit year")
    .transform((value) => parseInt(value))
    .refine(
      (year) => year <= new Date().getFullYear(),
      "Please enter a valid year"
    )
    .transform((value) => String(value)),
  annualRevenue: z
    .string()
    .min(3, "Revenue is required")
    .refine((val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))), {
      message: "Invalid revenue amount",
    }),
  ein: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "Enter a valid EIN (XX-XXXXXXX).")
    .optional(),

  businessState: z.string().min(2, "Please select an option"),
  businessAddress: z.string().min(5, "Enter complete address"),
});

export const personalInfoFormSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 characters"),
  birthday: z.date().optional(),
  phoneNumber: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  education: z.string().optional(),
  homeOwnershipStatus: z.string().min(2, "Please select an option"),
  industry: z.string().min(2, "Please select an option"),
  employmentStatus: z.string().min(2, "Please select an option"),

  creditScore: z.string().min(2, "Please select an option"),
  ssn: z
    .string()
    .regex(
      /^(?!666|9\d{2})[0-8]\d{2}-\d{2}-\d{4}$/,
      "Enter a valid SSN (XXX-XX-XXXX)."
    )
    .optional(),
  homeAddress: z.string().min(5, "Enter complete address"),
});

export const uploadDocumentsFormSchema = z.object({
  license: z.string().optional(),
  ein: z.string().optional(),
  mercantProcessingStatement: z.string().optional(),
  govId: z.string().optional(),
  businessAddressDoc: z.string().optional(),
});

export const DataTableSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  businessType: z.string().nullable(),
  businessName: z.string().nullable(),
  amount: z.number().int(),
  fundingReason: z.string().nullable(),
  businessStartDate: z.string().nullable(),
  businessState: z.string().nullable(),
  ein: z.string().nullable(),
  businessAddress: z.string().nullable(),
  birthday: z.string().optional(),
  homeAddress: z.string().nullable(),
  education: z.string().nullable(),
  homeOwnership: z.string().nullable(),
  industry: z.string().nullable(),
  employmentStatus: z.string().nullable(),
  creditScore: z.string().nullable(),
  docs: z.object({
    licenseDoc: z.string().nullable(),
    einDoc: z.string().nullable(),
    mpsDoc: z.string().nullable(),
    govIdDoc: z.string().nullable(),
    businessAddressDoc: z.string().nullable(),
  }),
  revenue: z.number().int(),
  ssn: z.string().nullable(),
});
