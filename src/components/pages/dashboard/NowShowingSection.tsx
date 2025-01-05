import { Card, CardContent } from "@/components/shadcn/card";
const NowShowingSection = () => {
  return (
    <section className="flex justify-start w-full pl-[10vw]">
      <div className="flex flex-col items-center py-10 gap-12">
        <span className="w-full text-4xl text-primary font-semibold border-l-[6px] pl-2 flex items-center border-primary">
          Now Showing
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          <Card>
            <CardContent
              className="h-full w-[50dvw] max-w-[16rem] min-h-[22rem] rounded-md"
              style={{ backgroundImage: "url(https://picsum.photos/1000)" }}
            ></CardContent>
          </Card>
          <Card>
            <CardContent
              className="h-full min-h-[20rem] rounded-md"
              style={{ backgroundImage: "url(https://picsum.photos/1000)" }}
            ></CardContent>
          </Card>
          <Card>
            <CardContent
              className="h-full min-h-[20rem] rounded-md"
              style={{ backgroundImage: "url(https://picsum.photos/1000)" }}
            ></CardContent>
          </Card>
          <Card>
            <CardContent
              className="h-full min-h-[20rem] rounded-md"
              style={{ backgroundImage: "url(https://picsum.photos/1000)" }}
            ></CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NowShowingSection;
