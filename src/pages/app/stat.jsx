import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";

export function Stat({ title, value, change }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6 text-zinc-100">
        {title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8 text-zinc-100">
        {value}
      </div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge
          color={
            change.startsWith("Ao vivo")
              ? "lime"
              : change.startsWith("VOD")
              ? "red"
              : "yellow"
          }
        >
          {change}
        </Badge>
      </div>
    </div>
  );
}
