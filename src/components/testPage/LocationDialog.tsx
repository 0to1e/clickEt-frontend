import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/shadcn/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Plus, X } from "lucide-react";
import {
  LocationFormData,
  LocationFormSchema,
  LocationItem,
} from "@/lib/formSchemas/distributorFormSchema/locationSchemas";

let locationCounter = 1;
const generateLocationId = () => {
  locationCounter++;
  return `loc-${locationCounter}`;
};

interface LocationDialogProps {
  onSave: (data: LocationFormData) => void;
  initialData?: LocationFormData;
  triggerText?: string;
  dialogTitle?: string;
  children?: React.ReactNode;
}

export function LocationDialog({
  onSave,
  initialData,
  triggerText = initialData ? "Edit Locations" : "Add Locations",
  dialogTitle = initialData ? "Edit Locations" : "Add Locations",
  children,
}: LocationDialogProps) {
  const defaultValues = useMemo((): LocationFormData => {
    return (
      initialData || {
        locations: [
          {
            id: "loc-1",
            type: "HQ",
            location: "",
            coordinates: { latitude: "", longitude: "" },
          },
        ],
        contacts: {
          phoneNumbers: [],
          emails: [],
        },
      }
    );
  }, [initialData]);

  const form = useForm<LocationFormData>({
    resolver: zodResolver(LocationFormSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = form;
  const locations = watch("locations") as LocationItem[];
  const phoneNumbers = watch("contacts.phoneNumbers");
  const emails = watch("contacts.emails");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: LocationFormData) => {
    onSave({ ...data, locations });
    setIsOpen(false);
    reset(defaultValues);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Addresses Section */}
            <div className="space-y-4">
              <h4 className="font-medium">Addresses</h4>
              {locations.map((loc, index) => (
                <div
                  key={loc.id}
                  className="border p-4 rounded-md space-y-4 relative pt-12"
                >
                  <Button
                    variant="destructive"
                    className="absolute top-3 right-3"
                    onClick={() =>
                      setValue(
                        "locations",
                        locations.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <X />
                  </Button>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Select
                        value={loc.type}
                        onValueChange={(value) => {
                          const updated = [...locations];
                          updated[index].type = value as "HQ" | "Branch";
                          setValue("locations", updated);
                        }}
                      >
                        <SelectTrigger className="w-[35%]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="HQ"
                            disabled={locations.some((l) => l.type === "HQ")}
                          >
                            HQ
                          </SelectItem>
                          <SelectItem value="Branch">Branch</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={loc.location}
                        onChange={(e) => {
                          const updated = [...locations];
                          updated[index].location = e.target.value;
                          setValue("locations", updated);
                        }}
                        placeholder="Address"
                      />
                    </div>
                    <h5 className="font-medium">Co-ordinates:</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        value={loc.coordinates.latitude}
                        onChange={(e) => {
                          const updated = [...locations];
                          updated[index].coordinates.latitude = e.target.value;
                          setValue("locations", updated);
                        }}
                        placeholder="Latitude"
                      />
                      <Input
                        value={loc.coordinates.longitude}
                        onChange={(e) => {
                          const updated = [...locations];
                          updated[index].coordinates.longitude = e.target.value;
                          setValue("locations", updated);
                        }}
                        placeholder="Longitude"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setValue("locations", [
                    ...locations,
                    {
                      id: generateLocationId(),
                      type: "Branch",
                      location: "",
                      coordinates: { latitude: "", longitude: "" },
                    },
                  ])
                }
              >
                <Plus /> Add Address
              </Button>
            </div>

            {/* Contacts Section */}
            <div className="space-y-4 border p-4 rounded-md">
              <h4 className="font-medium">Contacts</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium">Phone Numbers</h5>
                  <button
                    type="button"
                    className="p-1 bg-primary rounded-sm"
                    onClick={() =>
                      setValue("contacts.phoneNumbers", [
                        ...phoneNumbers,
                        { type: "inquiry", locationId: "", number: "" },
                      ])
                    }
                  >
                    <Plus size={15} color="white" className="bg-primary" />
                  </button>
                </div>
                {phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex gap-2">
                    <Select
                      value={phone.type}
                      onValueChange={(value) => {
                        const updated = [...phoneNumbers];
                        updated[index].type = value as "inquiry" | "support";
                        setValue("contacts.phoneNumbers", updated);
                      }}
                    >
                      <SelectTrigger className="w-[45%]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inquiry">Inquiry</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={phone.locationId}
                      onValueChange={(value) => {
                        const updated = [...phoneNumbers];
                        updated[index].locationId = value;
                        setValue("contacts.phoneNumbers", updated);
                      }}
                    >
                      <SelectTrigger className="w-[35%]">
                        <SelectValue placeholder="Select Address" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={phone.number}
                      onChange={(e) => {
                        const updated = [...phoneNumbers];
                        updated[index].number = e.target.value;
                        setValue("contacts.phoneNumbers", updated);
                      }}
                      placeholder="Phone Number"
                    />
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setValue(
                          "contacts.phoneNumbers",
                          phoneNumbers.filter((_, i) => i !== index)
                        )
                      }
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <div className="flex gap-2 items-center">
                  <h5 className="font-medium">Emails</h5>
                  <button
                    type="button"
                    className="p-1 bg-primary rounded-sm"
                    onClick={() => {
                      const defaultLocationId =
                        locations.length > 0 ? locations[0].id : "";
                      setValue("contacts.emails", [
                        ...emails,
                        {
                          type: "inquiry",
                          locationId: defaultLocationId,
                          email: "",
                        },
                      ]);
                    }}
                  >
                    <Plus size={15} color="white" className="bg-primary" />
                  </button>
                </div>
                {emails.map((email, index) => (
                  <div key={index} className="flex gap-2">
                    <Select
                      value={email.type}
                      onValueChange={(value) => {
                        const updated = [...emails];
                        updated[index].type = value as "inquiry" | "support";
                        setValue("contacts.emails", updated);
                      }}
                    >
                      <SelectTrigger className="w-[45%]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inquiry">Inquiry</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={email.locationId}
                      onValueChange={(value) => {
                        const updated = [...emails];
                        updated[index].locationId = value;
                        setValue("contacts.emails", updated);
                      }}
                    >
                      <SelectTrigger className="w-[35%]">
                        <SelectValue placeholder="Select Address" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={email.email}
                      onChange={(e) => {
                        const updated = [...emails];
                        updated[index].email = e.target.value;
                        setValue("contacts.emails", updated);
                      }}
                      placeholder="Email Address"
                    />
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setValue(
                          "contacts.emails",
                          emails.filter((_, i) => i !== index)
                        )
                      }
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                Save Location
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
