const TOPICS = [
  "safety",
  "account",
  "billing",
  "technical",
  "delete-data",
  "other",
] as const;

type Topic = (typeof TOPICS)[number];

type Payload = {
  name: string;
  email: string;
  topic: Topic;
  message: string;
};

type Problem = { field: keyof Payload; message: string };

/** Mirrors the browser validation, because the browser's can be bypassed. */
function validate(body: unknown): { data: Payload } | { problems: Problem[] } {
  const problems: Problem[] = [];
  const raw = (body ?? {}) as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const topic = typeof raw.topic === "string" ? raw.topic : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (name.length < 2) {
    problems.push({ field: "name", message: "Tell us what to call you." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    problems.push({ field: "email", message: "That email address looks incomplete." });
  }
  if (!TOPICS.includes(topic as Topic)) {
    problems.push({ field: "topic", message: "Choose what this is about." });
  }
  if (message.length < 10) {
    problems.push({
      field: "message",
      message: "A sentence or two about the problem helps us answer properly.",
    });
  }

  if (problems.length > 0) return { problems };
  return { data: { name, email, topic: topic as Topic, message } };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected JSON." }, { status: 400 });
  }

  const result = validate(body);
  if ("problems" in result) {
    return Response.json({ problems: result.problems }, { status: 422 });
  }

  // The message is validated and accepted here, but there is no mail provider
  // wired up yet, so it goes no further than this server. `delivered: false`
  // is what the page shows the person, rather than claiming it was sent.
  //
  // To make it live, send `result.data` to your provider and return
  // `delivered: true` only once that call succeeds.
  return Response.json({ received: true, delivered: false });
}
