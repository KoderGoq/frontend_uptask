import { z } from 'zod';


// Esquema de los proyctos
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string()
});

// Generar el tipo de datos a partir del esquema
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;