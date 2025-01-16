// src/pages/HomePage.tsx
import HeroCarousel from "@/components/custom/HeroCarousel";
import NowShowingSection from "@/components/pages/dashboard/NowShowingSection";

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <NowShowingSection variant="showing"/>
      <NowShowingSection variant="upcoming"/>
    </>
  );
};

export default HomePage;
