import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import StorageUtil from "./storage";
import { EventEmitter } from "./event";

export async function request<T>(
  config: AxiosRequestConfig & { method: Method }
) {
  const { url, headers = {} } = config;
  const _config = { ...config };

  if (url?.startsWith("/")) {
    _config.url = `${import.meta.env.VITE_APP_BASE_API}${url}`;
  }

  _config.headers = appendToken(headers);

  const res = await AxiosUtil.instance.request<any, AxiosResponse<T, any>>(
    _config
  );

  return handleResponse(res);
}

function appendToken(headers: any) {
  const token = TokenUtil.token;

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

function handleResponse<T>(res: AxiosResponse<T, any>) {
  const code = res.status;

  const data = parseData(res.data);

  switch (code) {
    case 400:
      throw new Error((data as { msg: string })?.msg || "参数出错~");
    case 401:
      HttpEventEmitter.trigger401Handler();
      throw new Error("权限错误~");
    case 500:
      throw new Error("服务端错误~");
    default:
      return data;
  }
}

// https://github.com/axios/axios/issues/1723
// if data is too large, axios does't parse
function parseData<T>(data: T): T {
  if (typeof data === "string") return JSON.parse(data);
  return data;
}

type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

class AxiosUtil {
  private static _instance: Axios;

  static get instance() {
    if (!this._instance) {
      this._instance = new Axios({});
    }

    return this._instance;
  }
}

export class TokenUtil {
  private static _token: string | null;

  static readonly tokenKey = "__requset_token___";

  static get token() {
    if (!this._token) {
      this._token = StorageUtil.get(this.tokenKey);
    }

    return this._token;
  }
}

export class HttpEventEmitter {
  private static eventEmitter = new EventEmitter();

  static regist401Handler(handler: (...args: any[]) => void) {
    this.eventEmitter.on("code_401", handler);
  }

  static trigger401Handler() {
    this.eventEmitter.fire("code_401");
  }
}
