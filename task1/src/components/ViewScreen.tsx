import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  color?: string;
}

export default function ViewScreen({ children, color }: Props) {
  return <div className={"w-screen h-screen flex " + color}>{children}</div>;
}
