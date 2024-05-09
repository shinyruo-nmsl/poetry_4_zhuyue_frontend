import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpMethod, HttpEventType } from "../global-type/http";
import StorageUtil from "./storage";
import { EventEmitter } from "./event";
import { createPromiseResolvers } from "./tool";

export async function request<T>(
  config: AxiosRequestConfig & { method: HttpMethod }
) {
  const { url, headers = {} } = config;
  const _config = { ...config };

  if (url?.startsWith("/")) {
    _config.url = `${import.meta.env.VITE_APP_BASE_API}${url}`;
  }

  _config.headers = appendToken(headers);

  const res = await axios<any, AxiosResponse<T, any>>({
    ..._config,
    validateStatus() {
      return true;
    },
  });

  return handleResponse(res);
}

export function sseRequest<D, P extends Record<string, string | number>>(
  url: string,
  query: P,
  messageCall: (data: D) => void
) {
  const eventSource = new EventSource(
    `${import.meta.env.VITE_APP_BASE_API}${url}${buildUrlQuery(query)}`
  );

  const { promise, resolve, reject } = createPromiseResolvers<
    undefined,
    Event
  >();

  eventSource.addEventListener("message", (event) => {
    messageCall(event.data as D);
  });

  eventSource.addEventListener("error", (error) => {
    reject(error);
  });

  eventSource.addEventListener("close", () => {
    resolve(undefined);
  });

  return promise;
}

function buildUrlQuery(query: Record<string, string | number>) {
  const keys = Object.keys(query);

  if (keys.length < 1) return "";
  return "?" + keys.map((k) => `${k}=${query[k]}`).join("&");
}

function appendToken(headers: any) {
  const token = AuthToken.token;

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

function handleResponse<T>(res: AxiosResponse<T, any>) {
  const code = res.status;

  switch (code) {
    case 400:
      throw new Error((res.data as { msg: string })?.msg || "参数出错~");
    case 401:
      HttpEventEmitter.triggerHandler("code_401");
      throw new Error((res.data as { msg: string })?.msg || "暂未登录~");
    case 500:
      throw new Error((res.data as { msg: string })?.msg || "服务端错误~");
    default:
      return res.data;
  }
}

export class AuthToken {
  private static _token: string | null;

  static readonly tokenKey = "__requset_token___";

  static get token() {
    if (!this._token) {
      this._token = StorageUtil.get(this.tokenKey);
    }

    return this._token;
  }

  static setToken(token: string) {
    StorageUtil.set(this.tokenKey, token, 24 * 60 * 60);
  }

  static remove() {
    StorageUtil.remove(this.tokenKey);
    this._token = null;
  }
}

export class HttpEventEmitter {
  private static eventEmitter = new EventEmitter();

  static registHandler(type: HttpEventType, handler: (...args: any[]) => void) {
    this.eventEmitter.on(type, handler);
  }

  static triggerHandler(type: HttpEventType) {
    this.eventEmitter.fire(type);
  }

  static removeHandler(type: HttpEventType, handler: (...args: any[]) => void) {
    this.eventEmitter.remove(type, handler);
  }
}
