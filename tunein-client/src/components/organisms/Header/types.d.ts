export interface HeaderItemsProps {
    href: string;
    label: string;
}
  
export interface HeaderProps extends StyledHeaderProps {
    items: HeaderItemsProps[];
}
