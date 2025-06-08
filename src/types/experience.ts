
export interface WorkExperience {
  company: string;
  title: string;
  duration: string;
  location: string;
  type: string;
  responsibilities: string[];
  skills: string[];
  startDate: string;
  endDate: string;
  isRemote?: boolean;
}
