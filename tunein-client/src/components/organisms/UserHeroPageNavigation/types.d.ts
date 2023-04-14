export interface ItemsProps {
  label: string;
}
export interface StyledProps {
  isHighlighted?: boolean;
}
export interface Props extends StyledProps {
  items: ItemsProps[];
}
