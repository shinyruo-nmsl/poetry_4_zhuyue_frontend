import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

let axiosInstance: Axios;

function getAxiosInstance() {
  if (!axiosInstance) {
    axiosInstance = new Axios({});
  }
  return axiosInstance;
}

export async function request<T>(
  config: AxiosRequestConfig & { method: Method }
) {
  const { url } = config;
  const _config = { ...config };
  if (url?.startsWith("/")) {
    _config.url = `${import.meta.env.VITE_APP_BASE_API}${url}`;
  }

  const res = await getAxiosInstance().request<any, AxiosResponse<T, any>>(
    _config
  );

  return handleResponse(res);
}

function handleResponse<T>(res: AxiosResponse<T, any>) {
  const code = res.status;

  switch (code) {
    case 400:
      if (typeof res.data === "string") {
        throw new Error(res.data);
      }
      throw new Error((res.data as { msg: string })?.msg || "参数出错~");
    case 500:
      throw new Error("服务端错误~");
    default:
      return parseData(res.data);
  }
}

// https://github.com/axios/axios/issues/1723
// if data is too large, axios does't parse
function parseData(data: any) {
  if (typeof data === "string") return JSON.parse(data);
  return data;
}
