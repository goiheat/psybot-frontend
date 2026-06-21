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
    const requestUrl = new URL(request.url);
    const upstreamResponse = await requestPsyboy(
      `/api/rest/threads/${encodeURIComponent(id)}/messages${requestUrl.search}`,
      { signal: request.signal },
    );
    return forwardPsyboyResponse(upstreamResponse);
  } catch {
    return psyboyUnavailableResponse();
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const upstreamResponse = await requestPsyboy(
      `/api/rest/threads/${encodeURIComponent(id)}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
        signal: request.signal,
      },
    );
    return forwardPsyboyResponse(upstreamResponse);
  } catch {
    return psyboyUnavailableResponse();
  }
}
