import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

const SidebarContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => null,
})

const useSidebar = () => useContext(SidebarContext)

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="hidden lg:block">{children}</div>
      <MobileSidebar>{children}</MobileSidebar>
    </SidebarContext.Provider>
  )
}

Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { setOpen } = useSidebar()
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      className={cn(
        "lg:hidden text-sm hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setOpen(true)}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarClose = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { setOpen } = useSidebar()
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      className={cn(
        "lg:hidden absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
})
SidebarClose.displayName = "SidebarClose"

const SidebarContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  React.ComponentPropsWithoutRef<typeof SheetContent>
>(({ className, children, ...props }, ref) => (
  <SheetContent
    ref={ref}
    side="left"
    className={cn("w-full border-r bg-background", className)}
    {...props}
  >
    {children}
  </SheetContent>
))
SidebarContent.displayName = "SidebarContent"

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useSidebar()
  const isMobile = useMobile()

  useEffect(() => {
    if (!isMobile) {
      setOpen(false)
    }
  }, [isMobile, setOpen])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SidebarContent>{children}</SidebarContent>
    </Sheet>
  )
}

MobileSidebar.displayName = "MobileSidebar"

const Item = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLAnchorElement> & {
      title: string
      href: string
    }
  >
>(({ className, title, children, ...props }, ref) => {
  return (
    <a
      href="#"
      className={cn(
        "group relative flex items-center gap-2 rounded-md px-3.5 py-2 font-medium hover:bg-secondary hover:text-foreground [&:has([data-active])]:bg-secondary [&:has([data-active])]:text-foreground",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      {title}
    </a>
  )
})
Item.displayName = "Item"

const Collapsible = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
      title: string
      icon?: React.ReactNode
    }
  >
>(({ className, title, icon, children, ...props }, ref) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return
      if (ref?.current?.contains(event.target)) return
      setOpen(false)
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("touchstart", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("touchstart", handleOutsideClick)
    }
  }, [ref])

  return (
    <div className={cn("space-y-1", className)} ref={ref} {...props}>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3.5 py-2 font-medium hover:bg-secondary hover:text-foreground",
          open && "bg-secondary text-foreground"
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {icon}
          {title}
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50")} />
      </Button>
      {open ? <div className="pl-8">{children}</div> : null}
    </div>
  )
})
Collapsible.displayName = "Collapsible"

const Label = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("mt-4 px-3.5 pb-1.5 text-sm font-semibold", className)}
      ref={ref}
      {...props}
    />
  )
})
Label.displayName = "Label"

const SkeletonItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2" ref={ref} {...props}>
      <Skeleton className="h-9 w-full rounded-md" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  )
})
SkeletonItem.displayName = "SkeletonItem"

const ChevronDown = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4 shrink-0 transition-transform", className)}
      ref={ref}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
})
ChevronDown.displayName = "ChevronDown"

export {
  Sidebar,
  MobileSidebar,
  SidebarTrigger,
  SidebarClose,
  SidebarContent,
  useSidebar,
  Item,
  Collapsible,
  Label,
  SkeletonItem,
}
