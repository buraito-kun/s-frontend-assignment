import { PropsWithChildren } from "react"

type Props = PropsWithChildren & {
  className?: string,
  color: string
}

export default function TodoBox({ children, className, color }: Props){
  return (
    <div className={className}>
      <div className={"w-full h-full border border-black rounded-xl overflow-y-auto " + color}>
        {children}
      </div>
    </div>
  )
}
