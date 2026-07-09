"use client";

import React, { useState } from "react";
import { 
  Form, 
  TextField, 
  TextArea, // Imported directly to fix the DOM attribute issue
  Label, 
  Input, 
  Select, 
  ListBox, 
  Button, 
  Tooltip, 
  Card 
} from "@heroui/react";
import { 
  Plus, 
  BookOpen, 
  Lock, 
  ArrowUpRight 
} from "@gravity-ui/icons";

export default function AddLesson() {
  // Mock User State - Change isPremium to true/false to test the access level behavior
  const [user] = useState({
    name: "Alex Dev",
    isPremium: false, // Set to true to unlock Premium option
  });

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    image: null,
    accessLevel: "free", // Always defaults to "free" initially
  });

  // Handle Text/Select Inputs
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Image Upload (Optional)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Safety guard: force "free" if user isn't premium
    const safePayload = {
      ...formData,
      accessLevel: user.isPremium ? formData.accessLevel : "free"
    };

    console.log("Submitting Life Lesson Payload:", safePayload);
    alert("Life lesson saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Info Banner if user is Free */}
      {!user.isPremium && (
        <div className="mb-6 p-4 rounded-xl bg-warning-50 border border-warning-200 flex items-center justify-between text-sm text-warning-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>You are currently on a <strong>Free Account</strong>. Upgrade to unlock paid lessons.</span>
          </div>
          <Button variant="secondary" size="sm" className="bg-warning-100 hover:bg-warning-200">
            Go Premium <ArrowUpRight className="w-3 h-3" />
          </Button>
        </div>
      )}

      <Card className="rounded-2xl border border-default-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create a New Life Lesson</h1>
            <p className="text-sm text-default-500">Share your experiences, mistakes, and guiding insight with the community.</p>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-6">
          {/* Lesson Title */}
          <TextField isRequired className="w-full">
            <Label className="font-medium text-sm text-default-700">Lesson Title</Label>
            <Input 
              placeholder="e.g., What 5 years in tech taught me about burnout"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="mt-1.5"
            />
          </TextField>

          {/* Grid Layout for Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Dropdown */}
            <Select 
              isRequired 
              placeholder="Choose a category"
              value={formData.category}
              onChange={(val) => handleInputChange("category", val)}
            >
              <Label className="font-medium text-sm text-default-700">Category</Label>
              <Select.Trigger className="mt-1.5">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="personal-growth">Personal Growth</ListBox.Item>
                  <ListBox.Item id="career">Career</ListBox.Item>
                  <ListBox.Item id="relationships">Relationships</ListBox.Item>
                  <ListBox.Item id="mindset">Mindset</ListBox.Item>
                  <ListBox.Item id="mistakes-learned">Mistakes Learned</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Emotional Tone Dropdown */}
            <Select 
              isRequired 
              placeholder="Choose an emotional tone"
              value={formData.emotionalTone}
              onChange={(val) => handleInputChange("emotionalTone", val)}
            >
              <Label className="font-medium text-sm text-default-700">Emotional Tone</Label>
              <Select.Trigger className="mt-1.5">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="motivational">Motivational</ListBox.Item>
                  <ListBox.Item id="sad">Sad</ListBox.Item>
                  <ListBox.Item id="realization">Realization</ListBox.Item>
                  <ListBox.Item id="gratitude">Gratitude</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Full Description / Story / Insight */}
          {/* Swapped input wrapper configuration directly to HeroUI's standalone TextArea */}
          <TextField isRequired className="w-full">
            <Label className="font-medium text-sm text-default-700">Full Description / Story / Insight</Label>
            <TextArea 
              placeholder="Go deep. What happened? What did it cost you? What's the takeaway?"
              rows={6}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-1.5 resize-none"
            />
          </TextField>

          {/* Optional Image Upload */}
          <div>
            <span className="block font-medium text-sm text-default-700 mb-1.5">Cover Image (Optional)</span>
            <div className="border-2 border-dashed border-default-300 rounded-xl p-4 text-center hover:border-primary transition duration-200">
              <input 
                type="file" 
                accept="image/*" 
                id="file-upload" 
                className="hidden" 
                onChange={handleImageChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer text-sm text-default-500 block">
                {formData.image ? (
                  <span className="text-primary font-medium">Selected: {formData.image.name}</span>
                ) : (
                  <span>Click to upload an aspect image for your story</span>
                )}
              </label>
            </div>
          </div>

          {/* Access Level Dropdown (with Conditional Free/Premium Logic) */}
          <div>
            <Label className="font-medium text-sm text-default-700">Access Level</Label>
            
            {user.isPremium ? (
              <Select 
                value={formData.accessLevel}
                onChange={(val) => handleInputChange("accessLevel", val)}
              >
                <Select.Trigger className="mt-1.5">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="free">Free Access</ListBox.Item>
                    <ListBox.Item id="premium">⭐ Premium (Paid Tier)</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            ) : (
              <Tooltip delay={100}>
                <Tooltip.Trigger className="w-full text-left block">
                  <Select isDisabled value="free">
                    <Select.Trigger className="mt-1.5 opacity-65 cursor-not-allowed">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="free">Free Access</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </Tooltip.Trigger>
                <Tooltip.Content className="bg-default-800 text-white p-2 rounded-lg text-xs shadow-md">
                  Upgrade to Premium to create paid lessons.
                </Tooltip.Content>
              </Tooltip>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 flex justify-end">
            <Button type="submit" color="primary" className="px-6 rounded-xl font-medium gap-2">
              <Plus className="w-4 h-4" /> Publish Lesson
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}