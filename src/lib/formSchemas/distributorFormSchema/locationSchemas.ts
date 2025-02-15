import { z } from "zod";

export const LocationItemSchema = z.object({
  id: z.string(),
  type: z.enum(["HQ", "Branch"]),
  location: z.string().min(1),
  coordinates: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
});

export const ContactPhoneSchema = z.object({
  type: z.enum(["inquiry", "support"]),
  number: z.string(),
  locationId: z.string(),
});

export const ContactEmailSchema = z.object({
  type: z.enum(["inquiry", "support"]),
  email: z.string().email(),
  locationId: z.string(),
});

export const LocationFormSchema = z.object({
  locations: z.array(LocationItemSchema),
  contacts: z.object({
    phoneNumbers: z.array(ContactPhoneSchema),
    emails: z.array(ContactEmailSchema),
  }),
});

export type LocationFormData = z.infer<typeof LocationFormSchema>;
export type LocationItem = z.infer<typeof LocationItemSchema>;