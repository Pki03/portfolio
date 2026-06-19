export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats: submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
            profile { ranking }
          }
        }`,
        variables: { username: "khurmi_03" },
      }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    const user = data?.data?.matchedUser;

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const ac = user.submitStats?.acSubmissionNum ?? [];
    const solved: Record<string, number> = {};
    ac.forEach((s: { difficulty: string; count: number }) => {
      solved[s.difficulty] = s.count;
    });

    return Response.json({
      easySolved: solved.Easy ?? 0,
      mediumSolved: solved.Medium ?? 0,
      hardSolved: solved.Hard ?? 0,
      totalSolved:
        (solved.Easy ?? 0) + (solved.Medium ?? 0) + (solved.Hard ?? 0),
      ranking: user.profile?.ranking ?? 0,
    });
  } catch {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
