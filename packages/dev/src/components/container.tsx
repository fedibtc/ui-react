import { HTMLAttributes } from "react"
import { Text } from "@fedibtc/ui"

export default function Container({
  className,
  children,
  title,
  ...props
}: HTMLAttributes<HTMLDivElement> & { title: string }) {
  return (
    <div
      className={[
        "flex flex-col gap-lg rounded-lg p-xl bg-white drop-shadow-xl sm:p-lx sm:drop-shadow-sm",
        className
      ]
        .filter(x => typeof x === "string")
        .join(" ")}
      {...props}
    >
      <div className="flex flex-col gap-3">
        <Text variant="h1" weight="bolder">
          {title}
        </Text>
        <div className="w-full h-xs bg-holo-600" />
      </div>
      {children}
    </div>
  )
}
