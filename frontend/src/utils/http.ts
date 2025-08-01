type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface CallParams {
  uri: string;
  method?: HTTPMethod;
  body?: any;
  headers?: Record<string, string>;
}

export async function call<T = unknown>({
  uri,
  method = "GET",
  body,
  headers = {},
}: CallParams): Promise<T> {
  const url = `http://127.0.0.1:3333/api/${uri}`;
  
  const rawHeaders: Record<string, string> = { ...headers };

  const options: RequestInit = {
    method,
    headers: rawHeaders,
  };

  if (body) {
    if (body instanceof FormData) {
      delete rawHeaders["Content-Type"];
      options.body = body;
    } else {
      rawHeaders["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    if (response.status === 204) {
      return await response.text() as unknown as T;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
