// import Image from "next/image";
// import Link from "next/link";
// import { Card, Button } from "@heroui/react";

// export default function AuthorCard({
//   author,
//   totalLessons,
// }) {
//   return (
//     <Card className="rounded-2xl border border-default-200 p-6">
//       <div className="flex flex-col items-center">

//         <Image
//           src={author.authorImage || "/default-avatar.png"}
//           alt={author.authorName}
//           width={90}
//           height={90}
//           className="rounded-full object-cover"
//         />

//         <h3 className="mt-4 text-xl font-semibold">
//           {author.authorName}
//         </h3>

//         {author.authorPremium && (
//           <span className="mt-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
//             ⭐ Premium
//           </span>
//         )}

//         <p className="mt-4 text-default-500">
//           {totalLessons} Lessons
//         </p>

//         <Link
//           href={`/profile/${author.authorId}`}
//           className="mt-5 w-full"
//         >
//           <Button
//             className="w-full"
//             variant="flat"
//             color="primary"
//           >
//             View Profile
//           </Button>
//         </Link>

//       </div>
//     </Card>
//   );
// }