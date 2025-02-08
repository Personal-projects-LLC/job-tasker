import { FC } from 'react';

interface SampleProps {
  data: object; // или укажите более конкретный тип вместо пустого интерфейса
}

export const Sample: FC<SampleProps> = () => {
  return (
    <div>
      <h1>Sample Component</h1>
    </div>
  );
};
