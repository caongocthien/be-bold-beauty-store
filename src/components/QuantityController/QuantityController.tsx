interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper,
  value,
  ...rest
}: Props) {
  const handleChanhe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    console.log('change')
    onType && onType(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }
  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <div className='flex '>
        <button className='border p-3' onClick={decrease}>
          -
        </button>
        <input
          type='number'
          className='outline-none border text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          onChange={handleChanhe}
          value={value}
          {...rest}
        />
        <button className='border p-3' onClick={increase}>
          +
        </button>
      </div>
      {/* <div className='pl-5 text-gray-500'>{product.attributes.inventory - quantityItemInCart} sản phẩm có sẳn</div> */}
    </div>
  )
}
