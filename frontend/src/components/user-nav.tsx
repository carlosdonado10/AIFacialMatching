import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-muted">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/100" alt="@carlos" />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">Carlos Donado</span>
            <span className="text-xs text-muted-foreground">User</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end">
        <DropdownMenuItem onClick={() => alert('Account clicked')}>
          Account
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Log out (soon)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
