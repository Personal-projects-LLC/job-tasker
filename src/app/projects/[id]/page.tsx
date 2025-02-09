import { Suspense } from 'react';
import ProjectContent from '@/components/projects/project-content';
import type { Metadata } from 'next';
import { getProject } from '@/app/_actions/project';

type Props = {
  params: Promise<{ id: string }>;
};

const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const resolvedParams = await params;
  const result = await getProject(resolvedParams.id);
  const project = result.data;

  return {
    title: project ? `${project.title} - TaskJobber` : 'Project - TaskJobber',
    description: project?.description ?? 'Project details',
  };
};

const ProjectPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  return (
    <Suspense
      fallback={
        <div className="container py-6">
          <div className="text-center">Loading project...</div>
        </div>
      }
    >
      <ProjectContent id={resolvedParams.id} />
    </Suspense>
  );
};

export { generateMetadata };
export default ProjectPage;
