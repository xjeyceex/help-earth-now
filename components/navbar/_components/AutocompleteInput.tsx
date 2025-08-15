'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

interface AutocompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  selectedValue?: string;
}

export default function AutocompleteInput({
  label,
  value,
  onChange,
  onSelect,
  options,
  placeholder,
  disabled = false,
  inputRef,
  selectedValue,
}: AutocompleteInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>(
    'below'
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Filter options based on input value
  useEffect(() => {
    if (value.trim()) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered.slice(0, 10)); // Limit to 10 items for mobile
      setIsDropdownOpen(filtered.length > 0);
    } else {
      setFilteredOptions([]);
      setIsDropdownOpen(false);
    }
  }, [value, options]);

  // Calculate dropdown position to avoid overflow
  useEffect(() => {
    if (isDropdownOpen && inputContainerRef.current) {
      const rect = inputContainerRef.current.getBoundingClientRect();
      const modalHeight = window.innerHeight;
      const spaceBelow = modalHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If not enough space below and more space above, show above
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownPosition('above');
      } else {
        setDropdownPosition('below');
      }
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    onSelect(option);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => {
    if (value.trim() && filteredOptions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const clearInput = () => {
    onChange('');
    inputRef?.current?.focus();
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative" ref={inputContainerRef}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="block w-full pl-10 pr-12 py-4 text-base border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {value && (
            <button
              onClick={clearInput}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2"
              type="button"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </button>
          )}
          {!disabled && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-400 text-sm transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: dropdownPosition === 'below' ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dropdownPosition === 'below' ? -10 : 10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-48 overflow-y-auto ${
              dropdownPosition === 'above'
                ? 'bottom-full mb-2'
                : 'top-full mt-2'
            }`}
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <ul className="py-1">
              {filteredOptions.map((option, index) => (
                <li key={`${option}-${index}`}>
                  <button
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm ${
                      selectedValue === option
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    }`}
                    type="button"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
