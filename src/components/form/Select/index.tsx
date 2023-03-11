type SelectParams = {
  label: string
  name: string
  options: { value: string; title: string }[]
  onChangeFn: Function
}

export const Select = (props: { params: SelectParams }) => {
  const { label, name, options, onChangeFn } = props.params

  const generateOptions = () => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.title}
      </option>
    ))
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <select
        className="input focus:outline-none focus:shadow-outline"
        name={name}
        onChange={(e) => onChangeFn(e)}
      >
        {generateOptions()}
      </select>
    </div>
  )
}
