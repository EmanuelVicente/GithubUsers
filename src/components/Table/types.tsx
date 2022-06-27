export enum AlignEnum {
  left = "left",
  center = "center",
  right = "right",
}

export type Align = AlignEnum.left | AlignEnum.center | AlignEnum.right;

export interface Data {
  value: string;
  align: Align;
}

export interface TableProps {
  className?: string;
  header: Data[];
  data: {
    data: Data[];
    id: string;
  }[];
  nextPage: () => void;
  hasMore: boolean;
}
