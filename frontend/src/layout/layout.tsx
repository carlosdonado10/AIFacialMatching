import { ReactNode, useState } from 'react'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export function Layout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <Navbar onToggleSidebar={() => setCollapsed(prev => !prev)} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
