"use client";

import { useState } from "react";

import {
  Button,
  Modal,
  Form,
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  Switch,
} from "@heroui/react";

import { toast } from "react-toastify";

import {
  createAdminLesson,
} from "@/lib/actions/lessons";

export default function AddAdminLesson() {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tone: "",
    visibility: "Public",
    accessLevel: "Free",
  });

  function handleChange(
    field,
    value
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await createAdminLesson(form);

      toast.success(
        "Lesson created successfully."
      );

      setForm({
        title: "",
        description: "",
        category: "",
        tone: "",
        visibility: "Public",
        accessLevel: "Free",
      });

      setOpen(false);

      // Refresh server data
      window.location.reload();

    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to create lesson."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        color="primary"
        onPress={() => setOpen(true)}
      >
        + Add Lesson
      </Button>


      <Modal>

        <Modal.Backdrop
          isOpen={open}
          onOpenChange={setOpen}
          variant="blur"
        >

          <Modal.Container
            size="lg"
            placement="center"
          >

            <Modal.Dialog>

              {({ close }) => (
                <>

                  <Modal.CloseTrigger />

                  <Modal.Header>
                    <Modal.Heading>
                      Add New Lesson
                    </Modal.Heading>
                  </Modal.Header>

                  <Form
                    onSubmit={handleSubmit}
                  >
                    <Modal.Body className="space-y-5">

                      <Input
                        label="Lesson Title"
                        placeholder="Enter lesson title"
                        value={form.title}
                        onChange={(e) =>
                          handleChange(
                            "title",
                            e.target.value
                          )
                        }
                        isRequired
                      />

                      <TextArea
                        label="Description"
                        placeholder="Write the lesson..."
                        value={
                          form.description
                        }
                        onChange={(e) =>
                          handleChange(
                            "description",
                            e.target.value
                          )
                        }
                        minRows={5}
                        isRequired
                      />

                      <Select
                        selectedKeys={
                          form.category
                            ? [form.category]
                            : []
                        }
                        onSelectionChange={(
                          keys
                        ) => {
                          const value =
                            Array.from(
                              keys
                            )[0];

                          handleChange(
                            "category",
                            value
                          );
                        }}
                      >
                        <Label>
                          Category
                        </Label>

                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>

                          <ListBox>

                            <ListBox.Item
                              id="personal-growth"
                              textValue="Personal Growth"
                            >
                              Personal Growth
                            </ListBox.Item>

                            <ListBox.Item
                              id="career"
                              textValue="Career"
                            >
                              Career
                            </ListBox.Item>

                            <ListBox.Item
                              id="relationships"
                              textValue="Relationships"
                            >
                              Relationships
                            </ListBox.Item>

                            <ListBox.Item
                              id="mindset"
                              textValue="Mindset"
                            >
                              Mindset
                            </ListBox.Item>

                            <ListBox.Item
                              id="mistakes-learned"
                              textValue="Mistakes Learned"
                            >
                              Mistakes Learned
                            </ListBox.Item>

                          </ListBox>

                        </Select.Popover>

                      </Select>


                      <Input
                        label="Tone"
                        placeholder="e.g. Inspirational"
                        value={form.tone}
                        onChange={(e) =>
                          handleChange(
                            "tone",
                            e.target.value
                          )
                        }
                      />

                      <Select
                        selectedKeys={[
                          form.visibility,
                        ]}
                        onSelectionChange={(
                          keys
                        ) => {
                          const value =
                            Array.from(
                              keys
                            )[0];

                          handleChange(
                            "visibility",
                            value
                          );
                        }}
                      >
                        <Label>
                          Visibility
                        </Label>

                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>

                          <ListBox>

                            <ListBox.Item
                              id="Public"
                              textValue="Public"
                            >
                              Public
                            </ListBox.Item>

                            <ListBox.Item
                              id="Private"
                              textValue="Private"
                            >
                              Private
                            </ListBox.Item>

                          </ListBox>

                        </Select.Popover>

                      </Select>


                      <Select
                        selectedKeys={[
                          form.accessLevel,
                        ]}
                        onSelectionChange={(
                          keys
                        ) => {
                          const value =
                            Array.from(
                              keys
                            )[0];

                          handleChange(
                            "accessLevel",
                            value
                          );
                        }}
                      >

                        <Label>
                          Access Level
                        </Label>

                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>

                          <ListBox>

                            <ListBox.Item
                              id="Free"
                              textValue="Free"
                            >
                              Free
                            </ListBox.Item>

                            <ListBox.Item
                              id="Premium"
                              textValue="Premium"
                            >
                              Premium
                            </ListBox.Item>

                          </ListBox>

                        </Select.Popover>

                      </Select>

                    </Modal.Body>


                    <Modal.Footer>

                      <Button
                        variant="light"
                        onPress={close}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        color="primary"
                        isLoading={loading}
                      >
                        Create Lesson
                      </Button>

                    </Modal.Footer>

                  </Form>

                </>
              )}

            </Modal.Dialog>

          </Modal.Container>

        </Modal.Backdrop>

      </Modal>
    </>
  );
}