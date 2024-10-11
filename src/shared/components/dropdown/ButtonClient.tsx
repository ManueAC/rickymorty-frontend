"use client";

export const ButtonClient = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: (v?: number, data?: unknown) => void;
}): JSX.Element => {
  return (
    <span
      className="w-full"
      onClick={(e) => action()}
    >
      {children}
    </span>
  );
};
