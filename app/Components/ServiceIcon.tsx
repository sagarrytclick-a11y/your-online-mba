import {
  GraduationCap,
  Briefcase,
  Compass,
  Megaphone,
  Target,
  Code2,
  PhoneCall,
  Bot,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "online-mba-counselling": GraduationCap,
  "career-placement-assistance": Briefcase,
  "edtech-consulting": Compass,
  "performance-marketing": Megaphone,
  "lead-generation": Target,
  "website-crm-development": Code2,
  "bpo-channel-partnership": PhoneCall,
  "ai-lead-qualification": Bot,
};

export default function ServiceIcon({
  slug,
  size = 20,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[slug] ?? Compass;
  return <Icon size={size} className={className} />;
}
