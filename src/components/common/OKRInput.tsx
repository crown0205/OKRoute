import { cn } from '@/lib/utils';
import { useState } from 'react';

function OKRInput({ placeholder = '할 일' }: { placeholder?: string }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const paddingLeft = tabIndex * 20;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        setTabIndex(Math.max(0, tabIndex - 1));
      } else {
        setTabIndex(tabIndex + 1);
      }
      event.currentTarget.focus();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div
      className="flex flex-row gap-2 items-center"
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <input
        className={cn(
          'flex-1 bg-transparent focus:outline-none',
          isChecked && 'text-gray-500 line-through',
        )}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
}

export default OKRInput;
