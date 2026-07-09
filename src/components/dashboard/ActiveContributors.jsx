"use client";

import { Avatar, Card, Table } from "@heroui/react";

export default function ActiveContributors() {
  const users = [
    { id: "1", name: "Sarah Johnson", lessons: 152, reputation: "⭐ 4.9" },
    { id: "2", name: "Michael Brown", lessons: 138, reputation: "⭐ 4.8" },
    { id: "3", name: "Emma Wilson", lessons: 119, reputation: "⭐ 4.8" },
    { id: "4", name: "Daniel Lee", lessons: 102, reputation: "⭐ 4.7" },
    { id: "5", name: "Olivia Davis", lessons: 96, reputation: "⭐ 4.7" },
  ];

  return (
    <Card className="mt-8 rounded-2xl border border-default-200 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Most Active Contributors
      </h2>

      {/* 1. Main Table component acts as a layout wrapper */}
      <Table>
        {/* 2. New required horizontal scroll wrapper */}
        <Table.ScrollContainer>
          {/* 3. New required Table.Content (where accessibility labels go) */}
          <Table.Content aria-label="Most Active Contributors">
            
            <Table.Header>
              <Table.Column>USER</Table.Column>
              <Table.Column>LESSONS</Table.Column>
              <Table.Column>REPUTATION</Table.Column>
            </Table.Header>

            <Table.Body>
              {users.map((user) => (
                // NOTE: HeroUI v3 prefers 'id' over 'key' for collection sync
                <Table.Row id={user.id} key={user.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <span>{user.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{user.lessons}</Table.Cell>
                  <Table.Cell>{user.reputation}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Card>
  );
}