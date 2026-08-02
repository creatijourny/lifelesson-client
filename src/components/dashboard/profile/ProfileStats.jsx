import { Card, CardBody } from "@heroui/react";
import { BookOpen, Heart } from "lucide-react";

export default function ProfileStats({ stats }) {
  const items = [
    {
      title: "Lessons Created",
      value: stats?.lessonsCreated || 0,
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Saved Lessons",
      value: stats?.savedLessons || 0,
      icon: <Heart className="h-8 w-8 text-danger" />,
      color: "bg-danger/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <Card
          key={item.title}
          className="border border-default-200 shadow-sm"
        >
          <div className="flex flex-row items-center justify-between p-6">

            <div>
              <p className="text-sm text-default-500">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {item.value}
              </h3>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${item.color}`}
            >
              {item.icon}
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
}