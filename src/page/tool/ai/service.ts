import { fetchStreamRequest, sseRequest } from "../../../util/http";

export function gptTest(
  prompt: string,
  call: (data: { data: string; done: boolean }, close: () => void) => void
) {
  return sseRequest("/ai/gptContent", { prompt }, call);
}

export function gptTest2(prompt: string) {
  return fetchStreamRequest("/ai/gptContent", { prompt });
}
