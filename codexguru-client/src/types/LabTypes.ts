export interface Lab {
  _id: string;
  name: string;
  labSessionEndDateTime: string;
  year: number;
  semester: number;
  createdAt: string;
  updatedAt: string;
}

export interface LabContextType {
  labs: Lab[];
  loading: boolean;
}
