import FeaturedLessons from "@/components/FeaturedLessons";
import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <HeroSlider />
    <FeaturedLessons />
    </div>
  );
}
