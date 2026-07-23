export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  console.log("ImageBB Response:", data);

   if (!data.success) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url;

}