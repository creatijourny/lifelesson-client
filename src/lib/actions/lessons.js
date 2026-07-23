'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createLesson(lesson) {
  const res = await fetch(`${baseUrl}/api/lessons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lesson),
  });

  if (!res.ok) {
    throw new Error("Failed to create lesson");
  }

  return res.json();
}


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

export async function getUserLessonCount(userId) {
  const res = await fetch(
    `${baseUrl}/api/users/${userId}/lesson-count`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}


// 'use server';

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export async function getLessons(id) {
//   const res = await fetch(`${baseUrl}/api/lessons/${id}`, {
//     cache: "no-store",
//   });

//   const contentType = res.headers.get("content-type");

//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}`);
//   }

//   if (!contentType?.includes("application/json")) {
//     const text = await res.text();
//     console.error(text);
//     throw new Error("Expected JSON but received HTML.");
//   }

//   return res.json();
// }
