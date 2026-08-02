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

export async function getLesson(id) {

  const res = await fetch(
    `${baseUrl}/api/dashboard/my-lessons/${id}`,
    {
      cache: "no-store",
    }
  );

  const lesson = await res.json();

  console.log("API returned:", lesson);

  return lesson;

  // return res.json();
}

// export const getLesson = async (id) => {
//   const res = await fetch(
//     `${baseUrl}/api/lessons/${id}`
//   );

//   return res.json();
// };

export async function getUserLessonCount(userId) {
  const res = await fetch(
    `${baseUrl}/api/users/${userId}/lesson-count`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

// Likes
export async function toggleLike(id, userId) {
  const res = await fetch(`${baseUrl}/api/lessons/${id}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    throw new Error("Failed to update like.");
  }

  return res.json();
}




export async function toggleFavorite(lessonId, userId, saved) {
  const res = await fetch(`${baseUrl}/api/favorites`, {
    method: saved ? "DELETE" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lessonId,
      userId,
    }),
  });

  console.log("Status:", res.status);

  const data = await res.json();

  console.log("Response:", data);

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
}


// Add favorite
export async function addFavorite(data) {
  const res = await fetch(`${baseUrl}/api/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// Check whether the current user saved this lesson
export async function checkFavorite(lessonId, userId) {
  const res = await fetch(
    `${baseUrl}/api/favorites/check/${lessonId}/${userId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

// Remove favorite
export async function removeFavorite(lessonId, userId) {
  const res = await fetch(`${baseUrl}/api/favorites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lessonId,
      userId,
    }),
  });

  return res.json();
}

// Get favorite count
export async function getFavoriteCount(lessonId) {
  const res = await fetch(
    `${baseUrl}/api/favorites/count/${lessonId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}


// Report lesson
// export async function reportLesson(data) {
//   const res = await fetch(`${baseUrl}/api/reports`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to report lesson");
//   }

//   return res.json();
// }

export async function reportLesson(reportData) {
  const res = await fetch(`${baseUrl}/api/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportData),
  });
  
  const result = await res.json();

if (res.status === 409) {
  return {
    alreadyReported: true,
    ...result,
  };
}

if (!res.ok) {
  throw new Error(result.message);
}

return result;
}

// Comment section
// Create comment
export async function createComment(commentData) {
  const res = await fetch(
    `${baseUrl}/api/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to add comment."
    );
  }

  return result;
}

// Get comments
// export async function getComments(lessonId) {
//   const res = await fetch(
//     `${baseUrl}/api/comments/${lessonId}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to load comments");
//   }

//   return res.json();
// }

// export async function getComments(lessonId) {
//   const res = await fetch(
//     `${baseUrl}/api/comments/${lessonId}`,
//     {
//       cache: "no-store",
//     }
//   );

//   const result = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     console.error("Backend Error:", result);
//     throw new Error(
//       result.message || "Failed to load comments"
//     );
//   }

//   return result;
// }

export async function getComments(lessonId) {
  const res = await fetch(
    `${baseUrl}/api/comments/${lessonId}`,
    {
      cache: "no-store",
    }
  );

  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Response:", text);

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

export async function getCommentsCount(
  lessonId
) {
  const res = await fetch(
    `${baseUrl}/api/comments/count/${lessonId}`,
    {
      cache: "no-store",
    }
  );
  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(result);
    throw new Error(result.message || "Failed to load comment count");
  }

  return result;

  // if (!res.ok) {
  //   throw new Error(
  //     "Failed to load comment count"
  //   );
  // }

  // return res.json();
}

export async function updateComment(commentId, text) {
  const res = await fetch(
    `${baseUrl}/api/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to update comment."
    );
  }

  return result;
}

export async function deleteComment(commentId) {
  const res = await fetch(
    `${baseUrl}/api/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to delete comment."
    );
  }

  return result;
}

// Dashboard

export async function getDashboardData(userId) {

  const res = await fetch(
    `${baseUrl}/api/dashboard/${userId}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message ||
      "Failed to load dashboard."
    );
  }

  return result;
}

export async function getMyLessons(userId) {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(
    `${baseUrl}/api/dashboard/my-lessons/user/${userId}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message ||
      "Failed to load lessons."
    );
  }

  return result;
}


// Update lesson
// export async function getLesson(id) {

//   const res = await fetch(
//     `${baseUrl}/api/dashboard/my-lessons/${id}`,
//     {
//       cache: "no-store",
//     }
//   );

//   return res.json();
// }

export async function updateLesson(id, lesson) {
  const res = await fetch(
    `${baseUrl}/api/dashboard/my-lessons/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to update lesson."
    );
  }

  return result;
}

// Delete button
export async function deleteLesson(id) {

  const res = await fetch(
    `${baseUrl}/api/dashboard/my-lessons/${id}`,
    {
      method: "DELETE",
    }
  );

   const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete lesson.");
  }

  return result;
}




// const result = await res.json().catch(() => null);

  // console.log("Report Response:", result);

  // if (!res.ok) {
  //   throw new Error(result?.message || "Failed to report lesson");
  // }

  // return result;



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
