export interface Lead {
  id: string;
  name: string;
  age: number;
  location: string;
  coursePreferred: string;
  qualification: string;
  queries: string;
  phoneNo: string;
  fees: string;
  date: string;
  status: 'on_process' | 'positive' | 'completed';
}
