import { Range } from "./Input.styles";

interface InputProps {
  min: number
  max: number
  value: number
  setValue: (value: number) => void
}

function InputRange(props: InputProps) {
  const { max, min, setValue, value } = props
  return (
    <Range
      max={max}
      min={min}
      type="range"
      value={value}
      onChange={event => setValue(Number(event.target.value))}
    />
  );
}

export default InputRange;