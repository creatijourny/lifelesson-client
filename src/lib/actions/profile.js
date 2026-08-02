const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/* ==========================================
   Get User Profile
========================================== */

export async function getProfile(userId) {
  const res = await fetch(
    `${baseUrl}/api/profile/${userId}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to load profile."
    );
  }

  return result;
}

/* ==========================================
   Update Profile
========================================== */

export async function updateProfile(
  userId,
  profileData
) {
  const res = await fetch(
    `${baseUrl}/api/profile/${userId}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(profileData),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message ||
        "Failed to update profile."
    );
  }

  return result;
}

/* ==========================================
   Profile Statistics
========================================== */

export async function getProfileStats(
  userId
) {
  const res = await fetch(
    `${baseUrl}/api/profile/stats/${userId}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message ||
        "Failed to load profile statistics."
    );
  }

  return result;
}

/* ==========================================
   User Public Lessons
========================================== */

export async function getUserPublicLessons(
  userId
) {
  const res = await fetch(
    `${baseUrl}/api/profile/lessons/${userId}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message ||
        "Failed to load user lessons."
    );
  }

  return result;
}