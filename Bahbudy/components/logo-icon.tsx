import Link from "next/link"

interface LogoIconProps {
  href?: string | null
  size?: "sm" | "md" | "lg"
}

export function LogoIcon({ href = "/", size = "md" }: LogoIconProps) {
  const sizeClasses = {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1.5",
  }

  const squareSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const Logo = (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <div className={`${squareSize[size]} bg-gray-300`}></div>
      <div className={`${squareSize[size]} bg-blue-500`}></div>
      <div className={`${squareSize[size]} bg-red-500`}></div>
    </div>
  )

  if (href) {
    return <Link href={href}>{Logo}</Link>
  }

  return Logo
}
