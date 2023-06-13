interface Tuition {
  id: number;
  title: string;
  details: string;
  price: number;
  category: string;
  author: {
    id: number;
    username: string;
  };
  imageDataURL: string;
}

export interface Props {
  tuition?: Tuition;
}
