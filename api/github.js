export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { repository, pusher, commits } = req.body;

    const commitList = commits
      .map((c) => `• ${c.message} — [View Commit](${c.url})`)
      .join("\n");

    const message = {
      content: `🚀 **New push in ${repository.full_name}**\n👤 ${pusher.name}\n${commitList}`,
    };

    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
