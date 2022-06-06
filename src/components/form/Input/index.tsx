type InputParams = {
  label: string;
  name: string;
  onChangeFn: Function;
};

export const Input = (props: { params: InputParams }) => {
  const { label, name, onChangeFn } = props.params;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="input"
        onChange={(e) => onChangeFn(e)}
      />
    </div>
  );
};
