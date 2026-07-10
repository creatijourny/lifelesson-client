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
  Switch 
} from "@heroui/react";
import { ArrowUpRight, CloudArrowUpIn } from "@gravity-ui/icons";
import { createLesson } from "@/lib/actions/lessons";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AddLessonPage() {
  const [isPremiumUser] = useState(false); 
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

    const safePayload = {
      title,
      description,
      category,
      tone,
      image,
    //   image: formData.get("image"),
      visibility: isPublic ? "Public" : "Private",
      accessLevel: isPremiumUser ? formData.get("accessLevel") : "Free",
    };

    // const res = await createLesson(safePayload);
    // if(res.insertedId){
    //     toast.success("Lesson posted successfully!");
    //     e.currentTarget.reset();
    // }

    const form = e.currentTarget;

    try {
      console.log("Submitting Lesson Data:", safePayload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    //   toast.success("Lesson posted successfully!");
    //   alert("Your wisdom has been shared successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }

     const res = await createLesson(safePayload);
    if(res.insertedId){
        toast.success("Lesson posted successfully!");
        form.reset();
        setImage(null);
        setPreview("");
        // e.currentTarget.reset();

    }

  };

  const renderAccessLevelSelect = () => {
    const selectComponent = (
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
            <ListBox.Item id="Free" textValue="Free (visible to everyone)">
              Free (visible to everyone)
            </ListBox.Item>
            <ListBox.Item id="Premium" textValue="Premium (visible only to Premium users + creator)">
              Premium (visible only to Premium users + creator)
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    );

    if (!isPremiumUser) {
      return (
        <Tooltip content="Upgrade to Premium to create paid lessons." placement="top" color="warning">
          <div className="w-full max-w-xs cursor-not-allowed">
            {selectComponent}
          </div>
        </Tooltip>
      );
    }     

    return selectComponent;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
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

          {/* Image */}
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
                <input type="file" name="image" accept="image/*" className="hidden" />
              </label>
            </div>
          </div> */}

          {/* image */}
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
          alt="Preview"
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Visibility Settings</span>
              <Switch 
                isSelected={isPublic} 
                onValueChange={setIsPublic}
                size="sm"
              >
                Make this lesson {isPublic ? "Public" : "Private"}
              </Switch>
            </div>

            {renderAccessLevelSelect()}
          </div>

        </Fieldset>

        <div className="flex justify-end gap-3 w-full pt-4">
          <Button variant="flat" color="danger" type="button">
            Cancel
          </Button>
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