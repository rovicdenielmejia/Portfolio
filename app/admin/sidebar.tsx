'use client'

import Link from 'next/link'
import { LayoutDashboard, FileText, Briefcase, Mail, Settings } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/blog', icon: FileText, label: 'Blog' },
    { href: '/admin/portfolio', icon: Briefcase, label: 'Portfolio' },
    { href: '/admin/inquiries', icon: Mail, label: 'Inquiries' },
    { href: '/admin/services', icon: Settings, label: 'Services' },
  ]

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{collapsed ? 'RM' : 'Rovic Mejia'}</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="sidebar-link"
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
