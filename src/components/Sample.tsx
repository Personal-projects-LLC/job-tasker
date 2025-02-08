interface SampleProps {
  data: object; // или укажите более конкретный тип вместо пустого интерфейса
}

const Sample = (data: SampleProps) => {
  return (
    <div>
      <h1>Sample Component</h1>
      {/* Принадлежит удалению */}
      <p>{JSON.stringify(data)}</p>
      {/* Принадлежит удалению */}
    </div>
  );
};

export default Sample;
