'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getLessons = async () => {
  const res = await fetch(`${baseUrl}/api/lessons`, {
    cache: "no-store",
  });

  return res.json();
};

export const getLesson = async (id) => {
  const res = await fetch(
    `${baseUrl}/api/lessons/${id}`
  );

  return res.json();
};