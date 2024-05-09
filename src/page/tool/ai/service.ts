import { sseRequest } from "../../../util/http";

export function gptTest(
  prompt: string,
  call: (data: { data: string; done: boolean }, close: () => void) => void
) {
  return sseRequest("/ai/gpttest", { prompt }, call);
}

export function gptTest2() {
  return new EventSource(`${import.meta.env.VITE_APP_BASE_API}/ai/gpttest`);
}
