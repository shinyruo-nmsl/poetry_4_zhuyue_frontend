import { createFetchStream } from "../../../util/http";

export function gptTest2(prompt: string) {
  return createFetchStream("/ai/gptContent", { prompt });
}
