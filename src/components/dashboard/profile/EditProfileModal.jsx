"use client";

import { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Avatar,
  Input,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { updateProfile } from "@/lib/actions/profile";
import { uploadImage } from "@/lib/imageUpload";

export default function EditProfileModal({
  isOpen,
  onOpenChange,
  profile,
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing profile data
  useEffect(() => {
    if (!profile) return;

    setName(profile.name || "");

    // Existing image URL is only used for preview
    setPreview(profile.image || "");

    // IMPORTANT:
    // Don't put the existing URL into `image`.
    // `image` should contain only a newly selected File.
    setImage(null);
  }, [profile]);

  // Clean up temporary preview URLs
  useEffect(() => {
    return () => {
      if (
        preview &&
        preview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle new image selection
  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    // Optional size validation: 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image must be smaller than 5 MB."
      );
      return;
    }

    // Store actual File
    setImage(file);

    // Show preview
    const objectUrl =
      URL.createObjectURL(file);

    setPreview(objectUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!profile) return;

    try {
      setLoading(true);

      // Keep existing image by default
      let imageUrl = profile.image || "";

      // Upload ONLY if user selected a new image
      if (image instanceof File) {
        imageUrl = await uploadImage(image);
      }

      await updateProfile(profile._id, {
        name,
        image: imageUrl,
      });

      toast.success(
        "Profile updated successfully."
      );

      router.refresh();

      onOpenChange(false);

    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      toast.error(
        err?.message ||
          "Failed to update profile."
      );

    } finally {
      setLoading(false);
    }
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
                    Edit Profile
                  </Modal.Heading>
                </Modal.Header>

                <form
                  id="edit-profile-form"
                  onSubmit={handleSubmit}
                >
                  <Modal.Body>
                    <div className="flex flex-col items-center gap-5">

                      {/* Profile image */}
                      <Avatar
                        src={preview}
                        name={name}
                        className="h-24 w-24"
                      />

                      {/* Image upload */}
                      <div className="flex flex-col items-center gap-2">
                        <label
                          htmlFor="profile-image"
                          className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-sky-300"
                        >
                          Change Profile Image
                        </label>

                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />

                        {image && (
                          <p className="text-xs text-default-500">
                            New image selected
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="mt-6">
                      <Input
                        label="Display Name"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                      <Input
                        label="Email"
                        value={
                          profile.email || ""
                        }
                        readOnly
                      />
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="light"
                      onPress={close}
                      type="button"
                      className="hover:bg-blue-300"
                    >
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      type="submit"
                      form="edit-profile-form"
                      isLoading={loading}
                      className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-300/60"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}


