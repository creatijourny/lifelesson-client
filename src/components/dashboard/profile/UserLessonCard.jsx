// import Image from "next/image";
// import Link from "next/link";

// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Chip,
//   Button,
// } from "@heroui/react";

// import {
//   Calendar,
//   Heart,
//   FolderOpen,
// } from "lucide-react";

// export default function UserLessonCard({
//   lesson,
// }) {
//   return (
//     <Card className="overflow-hidden border border-default-200 shadow-sm">

//       {/* Image */}

//       <div className="relative h-52 w-full">

//         <Image
//           src={lesson.imageUrl}
//           alt={lesson.title}
//           fill
//           className="object-cover"
//           sizes="(max-width:768px) 100vw, 33vw"
//         />

//       </div>

//       <CardBody className="space-y-4">

//         <Chip
//           color="primary"
//           variant="flat"
//           size="sm"
//         >
//           {lesson.category}
//         </Chip>

//         <h3 className="line-clamp-2 text-lg font-bold">
//           {lesson.title}
//         </h3>

//         <div className="flex items-center justify-between text-sm text-default-500">

//           <span className="flex items-center gap-2">
//             <Calendar size={16} />
//             {new Date(
//               lesson.createdAt
//             ).toLocaleDateString()}
//           </span>

//           <span className="flex items-center gap-2">
//             <Heart size={16} />
//             {lesson.likes?.length || 0}
//           </span>

//         </div>

//       </CardBody>

//       <CardFooter>

//         <Button
//           as={Link}
//           href={`/lessons/${lesson._id}`}
//           color="primary"
//           variant="flat"
//           startContent={
//             <FolderOpen size={16} />
//           }
//           fullWidth
//         >
//           View Lesson
//         </Button>

//       </CardFooter>

//     </Card>
//   );
// }