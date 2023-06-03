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
}

export interface Props {
  tuition?: Tuition;
}
