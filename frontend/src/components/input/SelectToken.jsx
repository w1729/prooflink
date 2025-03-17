import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import token_list from '@/components/token_list.json'

const configDefaultToken = token_list[0]

export const SelectToken = ({
  token,
  callbackChangeToken = () => {},
  value,
  callbackChangeValue = () => {},
  canChangeToken = true,
  canChangeValue = true,
  tokenList = token_list,
  defaultToken = configDefaultToken
}) => {
  let disabled = false;
  if(canChangeValue==false){
    disabled = true;
  }

  return (
    <div className='flex flex-row'>
      <div className='w-[180px] lg:w-1/4 pe-2'>
        <Select
          value={token || defaultToken}
          onValueChange={(e) => {
            if (!canChangeToken) return
            callbackChangeToken(e)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a token' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tokens</SelectLabel>
              {token_list.map((token) => (
                <SelectItem key={token.symbol} value={token}>
                  <div className='flex flex-row items-center'>
                    <img src={token.icon} alt={token.name} className='w-4 h-4 mr-2' />
                    {token.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='w-3/4 ps-2'>
        <Input
          type='text'
          placeholder='Value'
          className='text-end'
          value={value || defaultToken.min}
          onChange={(e) => {
            if (!canChangeValue) return
            callbackChangeValue(e)
          }}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default SelectToken
