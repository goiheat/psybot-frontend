import "server-only";

const PSYBOY_BASE_URL =
  process.env.PSYBOY_BASE_URL ?? "http://51.250.46.121";

const PSYBOY_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YjI0ZDVlOC0wZTY5LTRkNGEtOTM2ZC1hM2I0Zjc2NDY1MjQiLCJlbWFpbCI6ImRlbW9AcHN5Ym95LmxvY2FsIn0.j12yMFCajto7_8IYiqICkKksvNkcYt28C_aJSDefbPM";

export async function requestPsyboy(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Accept", headers.get("Accept") ?? "application/json");
  headers.set("Authorization", `Bearer ${PSYBOY_ACCESS_TOKEN}`);

  return fetch(`${PSYBOY_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers,
  });
}

export function forwardPsyboyResponse(upstreamResponse: Response): Response {
  const headers = new Headers();

  for (const headerName of [
    "content-type",
    "cache-control",
    "x-accel-buffering",
  ]) {
    const headerValue = upstreamResponse.headers.get(headerName);
    if (headerValue) headers.set(headerName, headerValue);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
}

export function psyboyUnavailableResponse(): Response {
  return Response.json(
    { detail: "Psyboy API is unavailable." },
    { status: 502 },
  );
}
