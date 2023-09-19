export interface Lab {
  _id: string;
  labSessionName: string;
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
