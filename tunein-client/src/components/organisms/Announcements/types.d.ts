export interface Props {
  id?: number;
}
export interface Tuition {
  id: number;
  title: string;
  details: string;
  price: number;
  category: string;
  author: Author;
  imageDataURL: string;
}
interface Author {
  id: number;
  username: string;
}
