import { z } from "zod";

export const DistributorSchema = z.object({
  name: z.string().min(1),
  commissionRate: z.number().min(0).max(100),
  isActive: z.boolean(),
});

export type DistributorFormData = z.infer<typeof DistributorSchema>;
