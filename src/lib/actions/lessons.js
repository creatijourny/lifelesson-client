'use server';

import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createLesson(lesson) {

  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/lessons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(lesson),
  });

  if (!res.ok) {
    throw new Error("Failed to create lesson");
  }

  return res.json();
}



export async function getLessons(filters = {}) {
  // const token = await getTokenServer();
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.category) {
    params.set("category", filters.category);
  }

  params.set(
    "page",
    String(filters.page || 1)
  );

  params.set("limit", "9");

  const url =
    `${baseUrl}/api/lessons?${params.toString()}`;

  // console.log("Fetching:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  // if (!res.ok) {
  //   throw new Error(
  //     "Failed to fetch lessons"
  //   );
  // }

  // return res.json();

  const data = await res.json();

  console.log("GET LESSONS:", res.status, data);

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch lessons");
  }

  return data;

}


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


// export async function getAdminDashboardData() {
//   const res = await fetch(
//     `${baseUrl}/api/admin/dashboard`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     const result = await res.json();

//     throw new Error(
//       result.message ||
//         "Failed to load admin dashboard"
//     );
//   }

//   return res.json();
// }

export async function getAdminDashboardData() {
  const res = await fetch(
    `${baseUrl}/api/admin/dashboard`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  console.log(
    "Admin dashboard API:",
    res.status,
    result
  );

  if (!res.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Failed to load admin dashboard"
    );
  }

  return result;
}

// Admin - Manage Users
export async function getAdminUsers() {
  const token = await getTokenServer();
  const res = await fetch(
    `${baseUrl}/api/admin/users`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to load users"
    );
  }

  return data;
}


export async function updateUserRole(
  userId,
  role
) {
  const token = await getTokenServer();

  const res = await fetch(
    `${baseUrl}/api/admin/users/${userId}/role`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
          authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        role,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to update user role"
    );
  }

  return data;
}

// Manage Lessons
export async function getAdminLessons(
  filters = {}
) {
  const token = await getTokenServer();

  const params = new URLSearchParams();

  params.set(
    "page",
    String(filters.page || 1)
  );

  params.set(
    "perPage",
    String(filters.perPage || 10)
  );

  if (filters.category) {
    params.set(
      "category",
      filters.category
    );
  }

  if (filters.visibility) {
    params.set(
      "visibility",
      filters.visibility
    );
  }

  if (filters.flagged) {
    params.set(
      "flagged",
      "true"
    );
  }

  const res = await fetch(
    `${baseUrl}/api/admin/lessons?${params.toString()}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to load admin lessons"
    );
  }

  return data;
}


export async function deleteAdminLesson(
  lessonId
) {
  const res = await fetch(
    `${baseUrl}/api/admin/lessons/${lessonId}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to delete lesson"
    );
  }

  return data;
}


export async function updateAdminLesson(
  lessonId,
  updates
) {
  const res = await fetch(
    `${baseUrl}/api/admin/lessons/${lessonId}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(updates),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to update lesson"
    );
  }

  return data;
}

// Admin Lesson
export async function createAdminLesson(
  lesson
) {
  const res = await fetch(
    `${baseUrl}/api/admin/lessons`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(lesson),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to create lesson"
    );
  }

  return data;
}
// Update lesson access level
export async function updateLessonAccessLevel(
  lessonId,
  accessLevel
) {
  const res = await fetch(
    `${baseUrl}/api/admin/lessons/${lessonId}/access-level`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessLevel,
      }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {

    console.log(
      "UPDATE ACCESS LEVEL API:",
      res.status,
      data
    );

    throw new Error(
      data.message ||
        "Failed to update lesson access level"
    );
  }

  return data;
}

// export async function getReportedLessons() {
//   const res = await fetch(
//     `${baseUrl}/api/admin/reported-lessons`,
//     {
//       cache: "no-store",
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(
//       data.message ||
//         "Failed to load reported lessons"
//     );
//   }

//   return data;
// }

// Get Reports
export async function getReportedLessons() {
  const res = await fetch(
    `${baseUrl}/api/admin/reported-lessons`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  console.log(
    "REPORTED LESSONS API:",
    res.status,
    data
  );

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to load reported lessons"
    );
  }

  return data;
}

// Delete Reports
export async function deleteReportedLesson(
  lessonId
) {
  const res = await fetch(
    `${baseUrl}/api/admin/reported-lessons/${lessonId}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to delete lesson"
    );
  }

  return data;
}

// Ignore reports
export async function ignoreLessonReports(
  lessonId
) {
  const res = await fetch(
    `${baseUrl}/api/admin/reported-lessons/${lessonId}/ignore`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
    },
});

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message ||
        "Failed to clear reports"
    );
  }

  return data;
}

// Featured lessons
export async function getFeaturedLessons() {
  const res = await fetch(
    `${baseUrl}/api/featured-lessons`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch featured lessons"
    );
  }

  return res.json();
}