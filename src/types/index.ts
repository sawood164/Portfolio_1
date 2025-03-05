export type ProjectCategory = "All" | "Web Apps" | "Mobile Apps";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}
