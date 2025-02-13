import { SampleProps } from '@/types/components/sample';

const Sample = ({ data }: SampleProps) => {
  return (
    <div>
      <h1>Sample Component</h1>
      <p>{data.ankap}</p>
    </div>
  );
};

export default Sample;
