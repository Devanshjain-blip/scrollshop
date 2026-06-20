import type { ReactNode } from 'react'

type IconProps = { size?: number; fill?: boolean; className?: string }

const wrap = (children: ReactNode, p: IconProps) => (
  <svg
    width={p.size ?? 22} height={p.size ?? 22} viewBox="0 0 24 24"
    fill={p.fill ? 'currentColor' : 'none'}
    stroke={p.fill ? 'none' : 'currentColor'}
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className={p.className}
    aria-hidden="true"
  >{children}</svg>
)

export const HeartIcon = (p: IconProps) => wrap(<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />, p)

export const CommentIcon = (p: IconProps) => wrap(
  <>
    <path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4 8.3 8.3 0 0 1-3.9-.9L3 21l1.9-5.7a8.3 8.3 0 0 1-.9-3.9 8.4 8.4 0 0 1 8.4-8.4 8.4 8.4 0 0 1 8.4 8.4z" />
  </>, p)

export const ShareIcon = (p: IconProps) => wrap(
  <>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
  </>, p)

export const VerifiedIcon = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#1D9BF0" d="M22.5 12.5c0-1.6-.9-3-2.3-3.7.3-1.5-.1-3.1-1.2-4.2-1.1-1.1-2.7-1.5-4.2-1.2C14.1 1.9 12.7 1 11.1 1S8.1 1.9 7.4 3.4c-1.5-.3-3.1.1-4.2 1.2-1.1 1.1-1.5 2.7-1.2 4.2C.6 10.5-.3 11.9-.3 13.5s.9 3 2.3 3.7c-.3 1.5.1 3.1 1.2 4.2 1.1 1.1 2.7 1.5 4.2 1.2.7 1.5 2.1 2.4 3.7 2.4s3-.9 3.7-2.4c1.5.3 3.1-.1 4.2-1.2 1.1-1.1 1.5-2.7 1.2-4.2 1.4-.7 2.3-2.1 2.3-3.7z" transform="translate(0.3 -1)"/>
    <path fill="#fff" d="M10.5 15.5 7 12l1.4-1.4 2.1 2.1 4.6-4.6L16.5 9.5 10.5 15.5z"/>
  </svg>
)

export const PlusIcon = (p: IconProps) => wrap(<><path d="M12 5v14M5 12h14" /></>, p)
export const MinusIcon = (p: IconProps) => wrap(<path d="M5 12h14" />, p)

export const HomeIcon = (p: IconProps) => wrap(
  <>
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </>, p)

export const SearchIcon = (p: IconProps) => wrap(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>, p)

export const BagIcon = (p: IconProps) => wrap(
  <>
    <path d="M6 7h12l1 13H5L6 7z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </>, p)

export const UserIcon = (p: IconProps) => wrap(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </>, p)

export const CloseIcon = (p: IconProps) => wrap(<><path d="M18 6 6 18M6 6l12 12" /></>, p)

export const CheckIcon = (p: IconProps) => wrap(<path d="m5 12 5 5L20 7" />, p)

export const WalletIcon = (p: IconProps) => wrap(
  <>
    <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H5a2 2 0 0 1-2-2z" />
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6H7" />
    <circle cx="16.5" cy="13" r="1.4" fill="currentColor" stroke="none" />
  </>, p)

export const BoltIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-12H12l1-8z"/>
  </svg>
)

export const ChevronLeftIcon = (p: IconProps) => wrap(<path d="m15 18-6-6 6-6" />, p)

export const StarIcon = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/>
  </svg>
)
