"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  Button,
  Tooltip,
  Switch,
  Chip
} from "@heroui/react";
import { ArrowUpRight, CloudArrowUpIn } from "@gravity-ui/icons";
import { createLesson, getLessons } from "@/lib/actions/lessons";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { uploadImage } from "@/lib/imageUpload";
import { authClient } from "@/lib/auth-client";


export default function AddLessonPage() {

  const { data: session } = authClient.useSession();
  const isPremiumUser =
    session?.user?.plan === "premium";
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const categories = [
    { key: "personal-growth", label: "Personal Growth" },
    { key: "career", label: "Career" },
    { key: "relationships", label: "Relationships" },
    { key: "mindset", label: "Mindset" },
    { key: "mistakes-learned", label: "Mistakes Learned" },
  ];

  const emotionalTones = [
    { key: "motivational", label: "Motivational" },
    { key: "sad", label: "Sad" },
    { key: "realization", label: "Realization" },
    { key: "gratitude", label: "Gratitude" },
  ];

  //   image
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  // image end

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      return;
    }
    setIsPending(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);


    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const tone = formData.get("tone");
    formData.append("image", image);

    const newErrors = {};
    if (!title) newErrors.title = "Please provide a powerful title.";
    if (!description || description.length < 20) {
      newErrors.description = "Please dive a bit deeper into your story (min. 20 characters).";
    }
    if (!category) newErrors.category = "Please select a category.";
    if (!tone) newErrors.tone = "Please select an emotional tone.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsPending(false);
      return;
    }


    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImage(image);
    }



    const safePayload = {
      title,
      description,
      category,
      tone,
      imageUrl,
      // image: formData.get("image"),
      visibility: isPublic
        ? "Public"
        : "Private",

      accessLevel: isPremiumUser
        ? formData.get("accessLevel") || "Free"
        : "Free",

      // visibility: isPublic ? "Public" : "Private",
      // accessLevel: isPremiumUser ? formData.get("accessLevel") : "Free",

      authorId: session.user.id,
      authorName: session.user.name,
      authorImage: session.user.image,
      authorPremium: isPremiumUser,
      // authorPremium: session.user.isPremium || false,

    };


    const form = e.currentTarget;



    // new code start
    try {
      const res = await createLesson(safePayload);

      if (res.insertedId) {
        toast.success("Lesson posted successfully!");

        // form.reset();
        setImage(null);
        setPreview("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish lesson.");
    } finally {
      setIsPending(false);
    }

    // new code end    

  };

  const renderAccessLevelSelect = () => {
    const selectComponent = (
      <div className="flex justify-between gap-6">
        <Select
        name="visibility"
        defaultValue="Public"
        isDisabled={!isPremiumUser}
        className="w-full max-w-xs"
      >
        <Label>Visibility</Label>
        <Select.Trigger className="rounded-lg border bg-surface p-2">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="single">
            <ListBox.Item id="Public" textValue="Public (visible to everyone)">
              Public (visible to everyone)
            </ListBox.Item>
            <ListBox.Item id="Private" textValue="Private (visible only to Premium users)">
              Private (visible only to Premium users & the author)
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Select
        name="accessLevel"
        defaultValue="Free"
        isDisabled={!isPremiumUser}
        className="w-full max-w-xs"
      >
        <Label>Access Level</Label>
        <Select.Trigger className="rounded-lg border bg-surface p-2">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="single">
            <ListBox.Item id="Free" textValue="Free">
              Free
            </ListBox.Item>
            <ListBox.Item id="Premium" textValue="Premium">
              Premium
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      </div>



    );   

    {
      !isPremiumUser && (
        <p className="mt-2 text-xs text-warning">
          ⭐ Upgrade to Premium to create Premium-only lessons.
        </p>
      )
    }

    {isPremiumUser && (
  <Chip
    color="warning"
    variant="flat"
    className="mb-2"
  >
    👑 Premium Creator
  </Chip>
)}

    return selectComponent;
  };

  return (
    // className="max-w-2xl mx-auto px-4 py-8"
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Share Your Wisdom</h1>
        <p className="text-default-500 text-sm">Pass down a meaningful life lesson to help others grow.</p>
      </div>

      <Form
        validationErrors={errors}
        onSubmit={handleSubmit}
        className="w-full space-y-6"
      >
        <Fieldset className="gap-4 w-full">
          {/* Title */}
          <Input
            label="Lesson Title"
            name="title"
            placeholder="e.g., What 5 Years of Failure Taught Me About Resilience"
            variant="bordered"
            required
          // errorMessage={errors.title}
          />

          {/* Category & Tone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Category Dropdown */}
            <Select name="category" isRequired className="w-full">
              <Label>Category</Label>
              <Select.Trigger className="rounded-lg border bg-surface p-2">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox selectionMode="single">
                  {categories.map((cat) => (
                    <ListBox.Item id={cat.key} key={cat.key} textValue={cat.label}>
                      {cat.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Emotional Tone Dropdown */}
            <Select name="tone" isRequired className="w-full">
              <Label>Emotional Tone</Label>
              <Select.Trigger className="rounded-lg border bg-surface p-2">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox selectionMode="single">
                  {emotionalTones.map((tone) => (
                    <ListBox.Item id={tone.key} key={tone.key} textValue={tone.label}>
                      {tone.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

          </div>

          {/* Description */}
          <TextArea
            label="Full Description / Story / Insight"
            name="description"
            placeholder="Share the raw context, the struggle, and the ultimate realization..."
            variant="bordered"
            rows={6}
            required
          // errorMessage={errors.description}
          />

          {/* Image1 start */}
          {/* <div className="w-full">
            <label className="block text-sm font-medium text-default-700 mb-2">
              Cover Image (Optional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl border-default-300 cursor-pointer hover:bg-default-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-default-500">
                  <CloudArrowUpIn className="w-6 h-6 mb-2" />
                  <p className="text-xs">Click to upload an image asset</p>
                </div>
                <input type="url" name="image" accept="image/*" className="hidden" />
              </label>
            </div>
          </div> */}

          {/* image start */}
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-default-700">
              Cover Image (Optional)
            </label>

            <label
              htmlFor="lesson-image"
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-default-300 transition-colors hover:border-primary hover:bg-default-50"
            >
              {preview ? (
                <div className="flex h-full w-full flex-col items-center justify-center p-3">
                  <Image
                    src={preview}
                    alt="title"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-lg object-cover"
                  />

                  <p className="mt-3 text-sm font-medium text-primary">
                    {image?.name}
                  </p>

                  <span className="text-xs text-default-500">
                    Click to change image
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-default-500">
                  <CloudArrowUpIn className="mb-3 h-8 w-8" />

                  <p className="text-sm font-medium">
                    Click to upload a cover image
                  </p>

                  <span className="mt-1 text-xs">
                    PNG, JPG, JPEG (Max 5MB)
                  </span>
                </div>
              )}

              <input
                id="lesson-image"
                type="file"
                name="image"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* image end */}

          <hr className="border-default-100 my-2" />

          {/* Controls */}
          <div>
            {/*  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" */}
            {/* <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Visibility</span>
              <Switch
                isSelected={isPublic}
                // onValueChange={setIsPublic}
                onValueChange= {(value) => {
                  setIsPublic(value);
                }}
                size="sm"
              >
                {isPublic
                  ? "Public"
                  : "Private"}
               
              </Switch>
              <p className="text-xs text-default-500">
                {isPublic
                  ? "Visible to everyone."
                  : "Only you can view this lesson."}

              </p>              

            </div> */}

            {renderAccessLevelSelect()}
          </div>

        </Fieldset>

        <div className="flex justify-end gap-3 w-full pt-4">
          <Link href="/">
            <Button variant="flat" color="danger" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            color="primary"
            type="submit"
            isLoading={isPending}
            endContent={!isPending && <ArrowUpRight />}
          >
            Publish Lesson
          </Button>
        </div>
      </Form>
    </div>
  );
}