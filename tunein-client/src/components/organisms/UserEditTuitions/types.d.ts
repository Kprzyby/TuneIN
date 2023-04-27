export interface StyledProps {
  flexPart: number
}
export interface Tuition {
  id: number;
  title: string;
  details: string;
  price: number;
  category: string;
  author: Author;
  image: string;
}
interface Author {
  id: number;
  username: string;
}
