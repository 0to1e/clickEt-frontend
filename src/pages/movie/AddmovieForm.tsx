import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Calendar } from "@/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  MovieFormValues,
  movieSchema,
} from "@/lib/formSchemas/movieFormSchema";
import { useAddMovie } from "@/api/movieApi";

const MovieForm = () => {
  const movieMutation = useAddMovie();
  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      name: "",
      category: "Nepali",
      description: "",
      releaseDate: new Date(),
      duration_min: 0,
      language: "Nepali",
      posterURL: {
        sm: "", // Small poster URL
        lg: "", // Large poster URL
      },
      trailerURL: "",
      status: "upcoming",
    },
  });

  const onSubmit = async (values: MovieFormValues) => {
    movieMutation.mutate(values);
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Trailer Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <FormField
                control={form.control}
                name="trailerURL"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div className="aspect-video w-full bg-gray-900">
                      {field.value ? (
                        <img
                          src={
                            getYouTubeThumbnail(field.value) ||
                            "/placeholder.svg"
                          }
                          alt="Trailer Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Movie Trailer Preview
                        </div>
                      )}
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter YouTube trailer URL"
                        {...field}
                        className="border-x-0 border-b-0 rounded-none"
                      />
                    </FormControl>
                    <FormMessage className="p-2" />
                  </FormItem>
                )}
              />
            </div>

            <div className="relative">
              {/* Poster Section - Left Side */}
              <div className="absolute left-4 -top-4 w-[180px]">
                <div className="space-y-4">
                  {/* Small Poster */}
                  <FormField
                    control={form.control}
                    name="posterURL.sm"
                    render={({ field }) => (
                      <FormItem className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="aspect-[2/3] w-full bg-gray-100">
                          {field.value ? (
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Small Movie Poster"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              Small Poster
                            </div>
                          )}
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Small Poster URL"
                            {...field}
                            className="border-x-0 border-b-0 rounded-none text-sm"
                          />
                        </FormControl>
                        <FormMessage className="p-2" />
                      </FormItem>
                    )}
                  />

                  {/* Large Poster */}
                  <FormField
                    control={form.control}
                    name="posterURL.lg"
                    render={({ field }) => (
                      <FormItem className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="aspect-[2/3] w-full bg-gray-100">
                          {field.value ? (
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Large Movie Poster"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              Large Poster
                            </div>
                          )}
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Large Poster URL"
                            {...field}
                            className="border-x-0 border-b-0 rounded-none text-sm"
                          />
                        </FormControl>
                        <FormMessage className="p-2" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Details Section - Right Side */}
              <div className="ml-[200px] space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-sm">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Movie Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nepali">Nepali</SelectItem>
                            <SelectItem value="Bollywood">Bollywood</SelectItem>
                            <SelectItem value="Hollywood">Hollywood</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="releaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className="w-full">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Pick a date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration_min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nepali">Nepali</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Section */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="bg-white p-6 rounded-lg shadow-sm">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full min-h-[120px] p-3 border rounded-md resize-y"
                          placeholder="Enter movie description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={movieMutation.isPending}
              className="w-full"
            >
              {movieMutation.isPending ? "Adding Movie ..." : "Add Movie"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MovieForm;
