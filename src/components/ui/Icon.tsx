import {
  Bot, Workflow, Globe, Smartphone, MessageSquare, FileSpreadsheet,
  Share2, Palette, TrendingUp, MapPin, Mail, BarChart3,
  Target, Heart, Rocket, Users, Sparkles, Store, Trophy, Zap, type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  Bot, Workflow, Globe, Smartphone, MessageSquare, FileSpreadsheet,
  Share2, Palette, TrendingUp, MapPin, Mail, BarChart3,
  Target, Heart, Rocket, Users, Sparkles, Store, Trophy, Zap,
}

export default function Icon({
  name,
  size = 20,
  className,
}: {
  name: string
  size?: number
  className?: string
}) {
  const Cmp = icons[name] ?? Globe
  return <Cmp size={size} className={className} />
}
