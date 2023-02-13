import { createClient } from "microcms-js-sdk";

export const client = () => {
  return createClient({
    serviceDomain: import.meta.env.PUBLIC_SERVICE_DOMAIN!,
    apiKey: import.meta.env.PUBLIC_API_KEY!,
  });
};
