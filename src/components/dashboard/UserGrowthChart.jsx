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

export default function UserGrowthChart({
  data = [],
}) {
  return (
    <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          User Growth
        </h2>

        <p className="text-sm text-default-500">
          Number of new users registered each month.
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
              dataKey="users"
              stroke="#16a34a"
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
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import { Card } from "@heroui/react";

// const data = [
//   { month: "Jan", users: 120 },
//   { month: "Feb", users: 165 },
//   { month: "Mar", users: 240 },
//   { month: "Apr", users: 315 },
//   { month: "May", users: 410 },
//   { month: "Jun", users: 520 },
// ];

// export default function UserGrowthChart() {
//   return (
//     <Card className="rounded-2xl border border-default-200 p-6 shadow-sm">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">
//           User Growth
//         </h2>

//         <p className="text-sm text-default-500">
//           New user registrations over time
//         </p>
//       </div>

//       <div className="h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#27272a"
//             />

//             <XAxis dataKey="month" />

//             <YAxis />

//             <Tooltip />

//             <Area
//               type="monotone"
//               dataKey="users"
//               stroke="#14b8a6"
//               fill="#14b8a6"
//               fillOpacity={0.2}
//               strokeWidth={3}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// }