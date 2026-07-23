import { Button, Table } from "@heroui/react";

export function LessonsTable({ lessons }) {
  // const {_id, title, category, visibility} = lesson;
  console.log(lessons);
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
                <Table.Cell>{lesson.reaction}</Table.Cell>
                <Table.Cell>{lesson.createdAt}</Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    className="rounded-none bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  >
                    Details
                  </Button>
                </Table.Cell>
                <Table.Cell><Button
                  size="sm"
                  className="rounded-none bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200"
                >
                  Update
                </Button></Table.Cell>
                <Table.Cell><Button
                  size="sm"
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