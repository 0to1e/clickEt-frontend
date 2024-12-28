"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/shadcn/dot-pattern";
import { Button } from "../shadcn/button";
import { useNavigate } from "react-router-dom";
function DotPatternDemo() {
  const navigate = useNavigate();
  return (
    <div className="relative center h-screen w-full flex-col overflow-hidden bg-background md:shadow-xl gap-10">
      <div className="size-[150px]">
        <img src="src/assets/icons/logo/Logo.png" className="grayscale" />
      </div>
      <span className="text-primary text-2xl font-semibold">
        This page doesn't exist !
      </span>
      <Button
        className="text-md bg-stone-600 hover:bg-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Head back !
      </Button>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}

export default DotPatternDemo;
