'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>(
    'below'
  );

  const containerRef = useRef<HTMLDivElement>(null);

  /** Update filtered options based on value */
  useEffect(() => {
    if (!value.trim()) {
      setFilteredOptions(options.slice(0, 50)); // Show first 50 if empty
      return;
    }
    setFilteredOptions(
      options
        .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 50)
    );
  }, [value, options]);

  /** Decide dropdown position based on available space */
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(
        spaceBelow < 200 && spaceAbove > spaceBelow ? 'above' : 'below'
      );
    }
  }, [isOpen]);

  /** Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /** Handlers */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      if (!isOpen) setIsOpen(true);
    },
    [onChange, isOpen]
  );

  const handleSelect = useCallback(
    (option: string) => {
      onChange(option);
      onSelect(option);
      setIsOpen(false);
    },
    [onChange, onSelect]
  );

  const handleInputClick = useCallback(() => {
    // Toggle open/close, always show all options if value empty
    setIsOpen((prev) => !prev || !value.trim());
  }, [value]);

  const clearInput = useCallback(() => {
    onChange('');
    setFilteredOptions(options.slice(0, 50));
    inputRef?.current?.focus();
    setIsOpen(true); // Keep open so they can re-pick
  }, [onChange, inputRef, options]);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>

      <div className="relative">
        {/* Search Icon */}
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
        </span>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className="block w-full pl-9 pr-11 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Right Icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {value && (
            <button
              onClick={clearInput}
              type="button"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </button>
          )}
          {!disabled && (
            <button
              type="button"
              onClick={handleInputClick}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-sm transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: dropdownPosition === 'below' ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dropdownPosition === 'below' ? -8 : 8 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${
              dropdownPosition === 'above'
                ? 'bottom-full mb-1.5'
                : 'top-full mt-1.5'
            }`}
            style={{
              maxHeight: 200,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <ul className="py-1">
              {filteredOptions.map((option, index) => (
                <li key={`${option}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors ${
                      selectedValue === option
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    }`}
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
