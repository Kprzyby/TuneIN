export interface ItemsProps {
  href: string;
  label: string;
}
export interface StyledProps {
  isHighlighted?: boolean;
}
export interface Props extends StyledProps {
  items: ItemsProps[];
}
