type TextParams = {
  label: string
  name: string
  placeholder: string
  rows?: number
  onChangeFn: Function
}

export const TextArea = (props: { params: TextParams }) => {
  const { label, name, placeholder, rows, onChangeFn } = props.params
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <textarea
        name={name}
        rows={rows || 10}
        className="input"
        placeholder={placeholder}
        onChange={(e) => onChangeFn(e)}
      />
    </div>
  )
}
