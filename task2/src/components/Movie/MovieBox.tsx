import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function MovieBox({ children }: Props) {
  return <div className="w-full flex flex-wrap justify-center overflow-x-hidden">{children}</div>;
}
