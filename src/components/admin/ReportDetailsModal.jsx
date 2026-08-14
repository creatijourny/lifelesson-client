"use client";

import {
  Modal,
  Button,
  Chip,
} from "@heroui/react";

export default function ReportDetailsModal({
  isOpen,
  onOpenChange,
  lesson,
}) {
  if (!lesson) {
    return null;
  }

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                    Reports — {lesson.title}
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                  <div className="space-y-4">

                    {lesson.flags?.length ? (
                      lesson.flags.map(
                        (flag, index) => (
                          <div
                            key={
                              flag._id ||
                              index
                            }
                            className="rounded-xl border p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-semibold">
                                  {flag.reason ||
                                    "No reason provided"}
                                </p>

                                <p className="mt-1 text-sm text-default-500">
                                  Reporter:{" "}
                                  {flag.reporterName ||
                                    flag.reporterEmail ||
                                    flag.reporterId ||
                                    "Unknown"}
                                </p>

                                {flag.createdAt && (
                                  <p className="mt-1 text-xs text-default-400">
                                    {new Date(
                                      flag.createdAt
                                    ).toLocaleString()}
                                  </p>
                                )}
                              </div>

                              <Chip
                                size="sm"
                                variant="flat"
                              >
                                Report {index + 1}
                              </Chip>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-default-500">
                        No reports found.
                      </p>
                    )}

                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="light"
                    onPress={close}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}