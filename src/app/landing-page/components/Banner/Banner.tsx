import Image from "next/image";
import { getImagePath } from "@/lib/utils";

const Banner = () => {
  return (
    <main>
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-navyblue sm:text-5xl  lg:text-7xl md:4px lh-96">
              Next.js <br /> Admin dashboard.
            </h1>
            <p className="mt-6 text-lg leading-8 text-bluegray">
              Ehya is the Instagram analytics platform teams use to stay focused
              on the goals, track <br /> engagement for report your business .
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Banner;
