import { Loader } from "lucide-react";
import { Box } from "../containers/Box";

export const TableLoader = (): JSX.Element => {
  return (
    <Box
      className="flex justify-center absolute top-0 items-center w-full h-full bg-white bg-opacity-80"
      style={{
        backgroundColor: "rgba(0, 0, 0, .2)",
      }}
    >
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <Loader color="green" size={24} />
      </svg>
    </Box>
  );
};
