import { useState } from 'react';

interface FilterProps {
  onFilterChange: (inputValue: string) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onFilterChange(value);
  };

  return (
    <div className="w-full max-w-96 mb-4">
      <label htmlFor="filter" className="block text-white text-sm font-medium">Filter by ID</label>
      <input
        id="filter"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter ID"
      />
    </div>
  );
}
