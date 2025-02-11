export interface OKR {
  id: string;
  category: 'work' | 'personal';
  objective: string;
  keyResults: Array<{
    id: string;
    value: string;
    isChecked: boolean;
    paddingLeft: number;
  }>;
  isShowOKR: boolean;
}
