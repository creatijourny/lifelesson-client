"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LessonGrowthChart({
  data = [],
}) {
  return (
    <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Lesson Growth
        </h2>

        <p className="text-sm text-default-500">
          Number of lessons created each month.
        </p>
      </div>

      <div className="h-[320px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="lessons"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}



// "use client";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { Card } from "@heroui/react";

// const data = [
//   { month: "Jan", lessons: 45 },
//   { month: "Feb", lessons: 68 },
//   { month: "Mar", lessons: 92 },
//   { month: "Apr", lessons: 121 },
//   { month: "May", lessons: 150 },
//   { month: "Jun", lessons: 182 },
// ];

// export default function LessonGrowthChart() {
//   return (
//     <Card className="rounded-2xl border border-default-200 p-6 shadow-sm">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">
//           Lesson Growth
//         </h2>

//         <p className="text-sm text-default-500">
//           New public lessons published over time
//         </p>
//       </div>

//       <div className="h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#27272a"
//             />

//             <XAxis dataKey="month" />

//             <YAxis />

//             <Tooltip />

//             <Line
//               type="monotone"
//               dataKey="lessons"
//               stroke="#2563eb"
//               strokeWidth={3}
//               dot={{ r: 5 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// }