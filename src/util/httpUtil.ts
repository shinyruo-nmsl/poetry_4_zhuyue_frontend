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

const Default_Host = "http://localhost:3333";

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
    _config.url = `${Default_Host}${url}`;
  }

  const res = await getAxiosInstance().request<any, AxiosResponse<T, any>>(
    _config
  );

  return handleResponse(res);
}

function handleResponse<T extends string>(res: AxiosResponse<T, any>) {
  const code = res.status;

  switch (code) {
    case 400:
      throw new Error((res.data as { msg: string })?.msg || "参数出错~");
    case 500:
      throw new Error("服务端错误~");
    default:
      return JSON.parse(res.data);
  }
}
