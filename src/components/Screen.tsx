import type { ReactNode } from 'react'

/** Full-height page with the shared photo background (public/bg.jpg) behind a dark overlay. */
export default function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="screen">
      <div
        className="screen-bg"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}bg.jpg)` }}
        aria-hidden
      />
      <main className={className ? `screen-content ${className}` : 'screen-content'}>{children}</main>
    </div>
  )
}
