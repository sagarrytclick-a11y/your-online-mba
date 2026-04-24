import React from 'react';
import { 
  Users, Target, Award, Clock, Shield, BookOpen, Phone, Mail, MapPin, 
  Star, CheckCircle, ArrowRight, HelpCircle, ChevronDown, Search,
  TrendingUp, Headphones, GraduationCap, Home, Info, Menu, X
} from 'lucide-react';

export type IconName = 
  | 'users' | 'target' | 'award' | 'clock' | 'shield' | 'bookOpen' 
  | 'phone' | 'mail' | 'mapPin' | 'star' | 'checkCircle' | 'arrowRight'
  | 'helpCircle' | 'chevronDown' | 'search' | 'trendingUp' | 'headphones'
  | 'graduationCap' | 'home' | 'info' | 'menu' | 'x';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, size = 20, className = "", style }) => {
  const iconMap = {
    users: <Users size={size} className={className} style={style} />,
    target: <Target size={size} className={className} style={style} />,
    award: <Award size={size} className={className} style={style} />,
    clock: <Clock size={size} className={className} style={style} />,
    shield: <Shield size={size} className={className} style={style} />,
    bookOpen: <BookOpen size={size} className={className} style={style} />,
    phone: <Phone size={size} className={className} style={style} />,
    mail: <Mail size={size} className={className} style={style} />,
    mapPin: <MapPin size={size} className={className} style={style} />,
    star: <Star size={size} className={className} style={style} />,
    checkCircle: <CheckCircle size={size} className={className} style={style} />,
    arrowRight: <ArrowRight size={size} className={className} style={style} />,
    helpCircle: <HelpCircle size={size} className={className} style={style} />,
    chevronDown: <ChevronDown size={size} className={className} style={style} />,
    search: <Search size={size} className={className} style={style} />,
    trendingUp: <TrendingUp size={size} className={className} style={style} />,
    headphones: <Headphones size={size} className={className} style={style} />,
    graduationCap: <GraduationCap size={size} className={className} style={style} />,
    home: <Home size={size} className={className} style={style} />,
    info: <Info size={size} className={className} style={style} />,
    menu: <Menu size={size} className={className} style={style} />,
    x: <X size={size} className={className} style={style} />
  };

  return iconMap[name] || <div className={className} style={style} />;
};

// Helper function to get icon component directly
export const getIcon = (name: IconName, size?: number, className?: string) => {
  return <DynamicIcon name={name} size={size} className={className} />;
};
