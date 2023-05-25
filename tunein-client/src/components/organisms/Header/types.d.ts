export interface HeaderItemsProps {
  href: string;
  label: string;
}
export interface StyledHeaderProps {
  isLight?: boolean;
  isHighlighted?: boolean;
  isHomepage?: boolean;
}
export interface HeaderProps extends StyledHeaderProps {
  items: HeaderItemsProps[];
}
