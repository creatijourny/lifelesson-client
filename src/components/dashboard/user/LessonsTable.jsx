'use client'
import { Button, Table } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteLesson } from "@/lib/actions/lessons";
import { toast } from "react-toastify";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export function LessonsTable({ lessons }) {
  // const {_id, title, category, visibility} = lesson;
const router = useRouter();
  // console.log(lessons);

  function handleUpdate(id) {
  router.push(
    `/dashboard/my-lessons/update/${id}`
  );
}

  async function handleDelete(id) {

    const ok = window.confirm(
      "Delete this lesson permanently?"
    );

    if (!ok) return;

    // try {

    //   await deleteLesson(id);

    //   toast.success(
    //     "Lesson deleted successfully."
    //   );

    //   router.refresh();

    // } catch {

    //   toast.error(
    //     "Failed to delete lesson."
    //   );

    // }

    try {
    const result = await deleteLesson(id);

    if (result.success) {
      toast.success("Lesson deleted successfully.");
      router.refresh();
    } else {
      toast.error(result.message || "Failed to delete lesson.");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Failed to delete lesson.");
  }
}

  
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="My Lessons" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Visibility</Table.Column>
            <Table.Column>Access Level</Table.Column>
            <Table.Column>Reaction count</Table.Column>
            <Table.Column>Created Date</Table.Column>
            <Table.Column>Details</Table.Column>
            <Table.Column>Update</Table.Column>
            <Table.Column>Delete</Table.Column>
          </Table.Header>
          <Table.Body>
            {
              lessons.map(lesson => <Table.Row key={lesson._id}>
                <Table.Cell>{lesson.title}</Table.Cell>
                <Table.Cell>{lesson.category}</Table.Cell>
                <Table.Cell>{lesson.visibility}</Table.Cell>
                <Table.Cell>{lesson.accessLevel}</Table.Cell>
                <Table.Cell>

                  ❤️ {lesson.likesCount}

                  <br />

                  🔖 {lesson.favoritesCount}

                  <br />

                  💬 {lesson.commentsCount}

                </Table.Cell>
                <Table.Cell>{new Date(lesson.createdAt).toLocaleDateString("en-US")}</Table.Cell>
                <Table.Cell>
                  <Link href={`/lessons/${lesson._id}`}>
                    <Button
                      size="sm"
                      className="rounded-none bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      Details
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/dashboard/my-lessons/update/${lesson._id}`}>
                  <Button 
                  onClick={() => handleUpdate(lesson._id)}
                    size="sm"
                    className="rounded-none bg-amber-100 text-amber-700 border border-amber-200"
                  >
                    Update
                  </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell><Button onClick={() =>
                  handleDelete(lesson._id)
                } size="sm"
                  className="rounded-none bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
                >
                  Delete
                </Button></Table.Cell>
              </Table.Row>)
            }

          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}