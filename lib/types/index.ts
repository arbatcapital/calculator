import { z } from "zod";
import {
  businessInfoFormSchema,
  DataTableSchema,
  personalInfoFormSchema,
  uploadDocumentsFormSchema,
} from "../validators";

export type TBusinessInfoForm = z.infer<typeof businessInfoFormSchema>;
export type TPersonalInfoForm = z.infer<typeof personalInfoFormSchema>;
export type TUploadDocumentsForm = z.infer<typeof uploadDocumentsFormSchema>;
export type TDataTableSchema = z.infer<typeof DataTableSchema>;
export type TDataTableCols = Omit<
  z.infer<typeof DataTableSchema>,
  "einDoc" | "mpsDoc" | "licenseDoc" | "govIdDoc" | "businessAddressDoc"
>;
