export async function GET() {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.info?handles=khurmiprateek3",
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    if (data.status !== "OK") {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const u = data.result[0];
    return Response.json({
      handle: u.handle,
      rating: u.rating ?? 0,
      maxRating: u.maxRating ?? 0,
      rank: u.rank ?? "unrated",
      maxRank: u.maxRank ?? "unrated",
    });
  } catch {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
