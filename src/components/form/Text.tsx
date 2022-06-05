import "./Form.css";

type TextParams = {
  label: string;
  name: string;
  onChangeFn: Function;
};

export const Text = (props: { params: TextParams }) => {
  const { label, name, onChangeFn } = props.params;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        name={name}
        rows={10}
        className="input"
        onChange={(e) => onChangeFn(e)}
      />
    </div>
  );
};
