import { toast } from "@/hooks/use-toast";
export enum API_ENTITY_ENUM {
  character = "character",
  episode = "episode",
}
export const fetchAPI = async (
  type: API_ENTITY_ENUM,
  filters?: Record<string, string>
) => {
  const api = `https://rickandmortyapi.com/api/${type}`;
  let url = api;
  if (filters) {
    let withFilters = "?";

    Object.entries(filters).map(([key, value]) => {
      withFilters = `${withFilters}${key}=${value}&`;
    });

    url = `${api}${withFilters}`;
  }
  let response;
  try {
    const res = await fetch(url, {
      method: "GET",
    })
      .then((data) => data.json())
      .catch(() => {
        toast({
          title: "ERR",
        });
      });
    response = res;
  } catch (error) {
    toast({
      title: `ERR: ${error}`,
      description: "It's broken",
    });
  }

  return response;
};
