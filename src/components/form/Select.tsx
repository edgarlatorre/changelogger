import "./Form.css";

type SelectParams = {
  label: string;
  name: string;
  options: JSX.Element[];
  onChangeFn: Function;
};

export const Select = (props: { params: SelectParams }) => {
  const { label, name, options, onChangeFn } = props.params;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        className="input focus:outline-none focus:shadow-outline"
        name={name}
        onChange={(e) => onChangeFn(e)}
      >
        {options}
      </select>
    </div>
  );
};
