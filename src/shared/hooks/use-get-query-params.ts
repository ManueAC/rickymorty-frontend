import { useSearchParams } from "next/navigation";

export enum PARAMS_ENUM {
  id = "id",
  status = "status",
  page = "page",
  species = "species",
  type = "type",
  gender = "gender",
}

type GetQueryReturnType = {
  id: string;
  status: string;
  page: string;
  species: string;
  type: string;
  gender: string;
};
export const defaultParams: GetQueryReturnType = {
  id: "",
  status: "",
  page: "",
  species: "",
  type: "",
  gender: "",
};
export const useGetQueryParams = (
  queries?: PARAMS_ENUM[]
): {
  id: string;
  status: string;
  page: string;
  species: string;
  type: string;
  gender: string;
} => {
  const params = useSearchParams();

  let paramsObj = {};

  let toIterate: PARAMS_ENUM[] | string[] | undefined = queries;

  if (queries) {
    toIterate = queries;
  } else {
    toIterate = Object.keys(defaultParams).map((key) => key);
  }

  toIterate?.map((queryKey) => {
    const available = params.get(queryKey);
    console.log("====================================");
    console.log("available", available);
    console.log("====================================");
    return (paramsObj = {
      ...paramsObj,
      //   [queryKey]: params.get(queryKey),
      ...(Boolean(available) && {
        [queryKey]: params.get(queryKey),
      }),
    });
  });

  return paramsObj as GetQueryReturnType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToQueryParams = (obj: Record<string, any>) => {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params.toString();
};
