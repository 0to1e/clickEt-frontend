import { AnimatedTooltip } from "@/components/shadcn/animated-tooltip";
import { Card } from "@/components/shadcn/card";

const Marquee = () => {
  const items = [
    {
      id: 1,
      name: "Esewa",
      designation: "Digital wallet company",
      image: "/esewa.png",
    },
    {
      id: 2,
      name: "Esewa",
      designation: "Digital wallet company",
      image: "/esewa.png",
    },
    {
      id: 3,
      name: "Esewa",
      designation: "Digital wallet company",
      image: "/esewa.png",
    },
    {
      id: 4,
      name: "Esewa",
      designation: "Digital wallet company",
      image: "/esewa.png",
    },
  ];

  return (
    <div className="flex justify-center p-3">
      <Card className="flex flex-col items-center gap-10 w-fit h-fit py-10 px-[calc(1vw+0.3rem)]">
        <span className="text-primary text-center w-full text-[calc(1vw+2rem)] font-semibold">
          Trusted by
        </span>
        <div className="flex p-10 ">
          <AnimatedTooltip items={items} />
        </div>
      </Card>
    </div>
  );
};

export default Marquee;
