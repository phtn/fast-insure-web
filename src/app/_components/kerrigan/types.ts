export interface KerriganData {
  id: number;
  title: string;
  subtext: string;
  description: string;
  src?: string;
}

export type KerriganProps = {
  title: string;
  description: string;
  data?: KerriganData[];
  listTitle?: string | undefined;
  actionLabel: string
  href?: string
};

export type KerriganListProps = {
  data?: KerriganData[];
  title?: string;
};
