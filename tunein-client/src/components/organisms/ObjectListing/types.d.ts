export interface Props<T> {
  objects: T[];
  handleTextClick: (text: string) => void;
}