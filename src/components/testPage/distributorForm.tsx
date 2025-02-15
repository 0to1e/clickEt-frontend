import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Card, CardContent } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";
import { LocationDialog } from "./LocationDialog";
import {
  DistributionRightsDialog,
  DistributionRightFormData,
} from "./distributorRightsDialog";
import { MOCK_MOVIES } from "@/lib/constants/mock-data";
import { LocationFormData } from "@/lib/formSchemas/distributorFormSchema/locationSchemas";
import { X } from "lucide-react";
import { DistributorFormData, DistributorSchema } from "@/lib/formSchemas/distributorFormSchema/basicDetailsSchema";



export function DistributorForm() {
  const [distributionRights, setDistributionRights] = useState<
    DistributionRightFormData[]
  >([]);

  const [locationData, setLocationData] = useState<LocationFormData>({
    locations: [],
    contacts: {
      phoneNumbers: [],
      emails: [],
    },
  });

  const form = useForm<DistributorFormData>({
    resolver: zodResolver(DistributorSchema),
    defaultValues: {
      name: "",
      commissionRate: 0,
      isActive: true,
    },
  });

  const onSubmit = (data: DistributorFormData) => {
    const completeData = {
      ...data,
      locations: locationData.locations,
      contacts: locationData.contacts,
      distributionRights,
    };
    console.log(completeData);
    // Handle form submission
  };

  const handleAddLocation = (data: LocationFormData) => {
    setLocationData({
      locations: [...locationData.locations, ...data.locations],
      contacts: {
        phoneNumbers: [
          ...locationData.contacts.phoneNumbers,
          ...data.contacts.phoneNumbers,
        ],
        emails: [...locationData.contacts.emails, ...data.contacts.emails],
      },
    });
  };

  const handleAddDistributionRight = (rightData: DistributionRightFormData) => {
    setDistributionRights([...distributionRights, rightData]);
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocationData((prev) => ({
      locations: prev.locations.filter((loc) => loc.id !== locationId),
      contacts: {
        phoneNumbers: prev.contacts.phoneNumbers.filter(
          (phone) => phone.locationId !== locationId
        ),
        emails: prev.contacts.emails.filter(
          (email) => email.locationId !== locationId
        ),
      },
    }));
  };

  const handleDeleteDistributionRights = (indexToDelete: number) => {
    setDistributionRights((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distributor Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="commissionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          let value = Number(e.target.value);
                          if (value < 0) value = 0;
                          if (value > 100) value = 100;
                          field.onChange(value);
                        }}
                        min="0"
                        max="100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Is Active</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Location and Contacts</h3>
                <LocationDialog onSave={handleAddLocation} />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {locationData.locations.map((location) => (
                    <div
                      key={location.id}
                      className="relative"
                    >
                      <LocationDialog
                        key={location.id}
                        onSave={(data: LocationFormData) => {
                          setLocationData((prev) => {
                            // Filter out old location and its contacts
                            const updatedLocations = prev.locations.map((loc) =>
                              loc.id === location.id ? data.locations[0] : loc
                            );

                            const updatedPhoneNumbers =
                              prev.contacts.phoneNumbers
                                .filter(
                                  (phone) => phone.locationId !== location.id
                                )
                                .concat(data.contacts.phoneNumbers);

                            const updatedEmails = prev.contacts.emails
                              .filter(
                                (email) => email.locationId !== location.id
                              )
                              .concat(data.contacts.emails);

                            return {
                              locations: updatedLocations,
                              contacts: {
                                phoneNumbers: updatedPhoneNumbers,
                                emails: updatedEmails,
                              },
                            };
                          });
                        }}
                        initialData={{
                          locations: [location],
                          contacts: {
                            phoneNumbers:
                              locationData.contacts.phoneNumbers.filter(
                                (phone) => phone.locationId === location.id
                              ),
                            emails: locationData.contacts.emails.filter(
                              (email) => email.locationId === location.id
                            ),
                          },
                        }}
                        triggerText=""
                        dialogTitle="Edit Location"
                      >
                        <Badge
                          variant={
                            location.type === "HQ" ? "destructive" : "secondary"
                          }
                          className="px-3 py-1 text-sm cursor-pointer"
                        >
                          {location.location}{" "}
                          <span className="ml-2 text-xs">
                            ({location.type})
                          </span>
                        </Badge>
                      </LocationDialog>
                      <button
                        className="absolute -top-2.5 -right-0.5 bg-primary rounded-md"
                        onClick={() => handleDeleteLocation(location.id)}
                        title="Delete Location"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Distribution Rights</h3>
                <DistributionRightsDialog
                  onSave={handleAddDistributionRight}
                  addresses={locationData.locations}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {distributionRights.map((right, index) => (
                  <div className=" relative">
                    <DistributionRightsDialog
                      key={index}
                      onSave={(updatedRight: DistributionRightFormData) => {
                        setDistributionRights((prev) =>
                          prev.map((r, i) => (i === index ? updatedRight : r))
                        );
                      }}
                      addresses={locationData.locations}
                      initialData={right}
                      triggerText=""
                      dialogTitle="Edit Distribution Right"
                    >
                      <Badge
                        variant="outline"
                        className="px-3 py-1 text-sm cursor-pointer"
                      >
                        {MOCK_MOVIES.find((m) => m.id === right.movieId)?.title}
                        <span className="ml-2 text-xs">
                          ({right.territories.join(", ")})
                        </span>
                      </Badge>
                    </DistributionRightsDialog>
                    <button
                      className="absolute -top-2.5 -right-0.5 bg-primary rounded-md"
                      onClick={() => handleDeleteDistributionRights(index)}
                      title="Delete Rights"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Add Distributor
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
