import {
  forwardPsyboyResponse,
  psyboyUnavailableResponse,
  requestPsyboy,
} from "@/shared/api/psyboy-server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const upstreamResponse = await requestPsyboy(
      `/api/rest/threads${requestUrl.search}`,
      { signal: request.signal },
    );
    return forwardPsyboyResponse(upstreamResponse);
  } catch {
    return psyboyUnavailableResponse();
  }
}

export async function POST(request: Request) {
  try {
    const upstreamResponse = await requestPsyboy("/api/rest/threads", {
      method: "POST",
      signal: request.signal,
    });
    return forwardPsyboyResponse(upstreamResponse);
  } catch {
    return psyboyUnavailableResponse();
  }
}
