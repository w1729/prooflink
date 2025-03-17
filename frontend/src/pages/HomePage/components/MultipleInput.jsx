import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Minus } from 'lucide-react'

const MultipleInput = ({ value, onChange, className, remove, children = null }) => {
  return (
    <div className={className}>
      {value.map((item, index) => (
        <div key={index} className='flex items-center space-x-4 pt-2'>
          <Checkbox name='active' checked={item.active} onCheckedChange={(e) => onChange(index, e)} />
          <Input name='key' value={item.key} onChange={(e) => onChange(index, e)} placeholder='Key' />
          <Input name='value' value={item.value} onChange={(e) => onChange(index, e)} placeholder='Value' />
          <button type='button' onClick={() => remove(index)}>
            <Minus className="text-red-400 hover:text-red-500"/>
          </button>
        </div>
      ))}
      {children}
    </div>
  )
}
export default MultipleInput
