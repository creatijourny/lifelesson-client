"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";

const slides = [
  {
    title: "Every Experience Holds a Lesson",
    subtitle:
      "Capture meaningful life lessons, personal experiences, and wisdom before they fade. Build your own digital collection of knowledge that grows with you.",
    button: "Start Your Journey",
    color: "from-slate-700 via-sky-700 to-cyan-700",
  },
  {
    title: "Learn From People Around the World",
    subtitle:
      "Explore inspiring public lessons shared by others. Discover perspectives, overcome challenges, and gain practical wisdom from real-life experiences.",
    button: "Explore Lessons",
    color: "from-slate-700 via-blue-700 to-sky-700",
  },
  {
    title: "Grow a Better Version of Yourself",
    subtitle:
      "Organize your favorite lessons, monitor your personal growth, and revisit insights whenever life presents new challenges.",
    button: "Begin Learning",
    color: "from-slate-700 via-teal-700 to-cyan-700",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        speed={2000}
        className="hero-swiper h-[60vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative flex h-full items-center bg-gradient-to-br ${slide.color} overflow-hidden`}//             
            >
              {/* Decorative Blurs */}
              {/* Premium ambient glow */}
              <div className="absolute -left-28 top-8 h-80 w-80 rounded-full bg-sky-300/15 blur-[120px]" />
              <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-300/12 blur-[140px]" />
              <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-white/5 blur-[100px]" />              

              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

              <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="max-w-3xl rounded-3xl border border-white/15 bg-white/8 p-8 backdrop-blur-xl shadow-2xl md:p-10">
                 
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/30 bg-white/12 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur-md">
                    ✨ Digital Life Lessons
                  </span>

                  <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg leading-8 text-sky-100/90 md:text-xl">
                    {slide.subtitle}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      href="/login"
                      className="rounded-2xl bg-white px-8 py-4 font-semibold text-slate-800 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-xl"
                    >
                      {slide.button}
                    </Link>

                    <Link
                      href="/lessons"
                      className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                    >
                      Browse Lessons
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          transform: scale(0.8);
        }

        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: white;
          width: 30px;
          border-radius: 9999px;
        }
      `}</style> */}
    </section>
  );
}


// Old version
// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import Link from "next/link";

// const slides = [
//   {
//     title: "Every Experience Holds a Lesson",
//     subtitle:
//       "Capture meaningful life lessons, personal experiences, and wisdom before they fade. Build your own digital collection of knowledge that grows with you.",
//     button: "Start Your Journey",
//     // background: "/images/night-sky.png"
//     color: "from-cyan-600 via-blue-600 to-indigo-700",
//   },
//   {
//     title: "Learn From People Around the World",
//     subtitle:
//       "Explore inspiring public lessons shared by others. Discover perspectives, overcome challenges, and gain practical wisdom from real-life experiences.",
//     button: "Explore Lessons",
//     color: "from-violet-600 via-purple-600 to-fuchsia-700",
//   },
//   {
//     title: "Grow a Better Version of Yourself",
//     subtitle:
//       "Organize your favorite lessons, monitor your personal growth, and revisit insights whenever life presents new challenges.",
//     button: "Begin Learning",
//     color: "from-emerald-600 via-teal-600 to-cyan-700",
//   },
// ];

// export default function HeroSlider() {
//   return (
//     <section className="relative">
//       <Swiper
//         modules={[Autoplay, Pagination, Navigation]}
//         autoplay={{
//           delay: 7000,
//           disableOnInteraction: false,
//         }}
//         pagination={{ clickable: true }}
//         navigation
//         loop
//         speed={2000}
//         className="hero-swiper h-[60vh]"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className={`relative flex h-full items-center bg-gradient-to-br ${slide.color}`}//
//             >
//               {/* Decorative Blurs */}
//               <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
//               <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

//               {/* Grid Pattern */}
//               <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:50px_50px]" />

//               <div className="relative z-10 mx-auto max-w-7xl px-6">
//                 <div className="max-w-3xl">
//                   <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
//                             ✨ Digital Life Lessons
//                   </span>

//                   <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white md:text-7xl">
//                     {slide.title}
//                   </h1>

//                   <p className="mt-6 text-lg leading-8 text-blue-100 md:text-xl">
//                     {slide.subtitle}
//                   </p>

//                   <div className="mt-10 flex flex-wrap gap-4">
//                     <Link
//                       href="/login"
//                       className="rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
//                     >
//                       {slide.button}
//                     </Link>

//                     <Link
//                       href="/lessons"
//                       className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
//                     >
//                       Browse Lessons
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* <style jsx global>{`
//         .swiper-button-next,
//         .swiper-button-prev {
//           color: white;
//           transform: scale(0.8);
//         }

//         .swiper-pagination-bullet {
//           background: white;
//           opacity: 0.5;
//         }

//         .swiper-pagination-bullet-active {
//           opacity: 1;
//           background: white;
//           width: 30px;
//           border-radius: 9999px;
//         }
//       `}</style> */}
//     </section>
//   );
// }