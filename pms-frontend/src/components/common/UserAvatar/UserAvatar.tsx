// Avatar that shows the picture if there is one, otherwise the user's initials.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/helpers/initials";
import { cn } from "@/lib/utils";

export function UserAvatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  return (
    <Avatar className={cn(className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback>{initials(name)}</AvatarFallback>
    </Avatar>
  );
}
