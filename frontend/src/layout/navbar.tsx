import { Menu } from 'lucide-react'
import { UserNav } from "../components/user-nav.tsx";

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="h-16 px-6 border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <button onClick={onToggleSidebar} className="p-2">
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-lg font-semibold">Lorem Ipsum Dolor</span>
      </div>
      <UserNav />
    </header>
  )
}