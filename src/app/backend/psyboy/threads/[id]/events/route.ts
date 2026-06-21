import {
  forwardPsyboyResponse,
  psyboyUnavailableResponse,
  requestPsyboy,
} from "@/shared/api/psyboy-server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const upstreamResponse = await requestPsyboy(
      `/api/sse/threads/${encodeURIComponent(id)}`,
      {
        headers: { Accept: "text/event-stream" },
        signal: request.signal,
      },
    );
    return forwardPsyboyResponse(upstreamResponse);
  } catch {
    return psyboyUnavailableResponse();
  }
}
