'use client';
import { useState, useEffect, useContext, useRef } from 'react';
import { LocationContext } from '@/context/location-provider';
import { states, counties as allCounties } from '@/app/us-datas';
import { motion, AnimatePresence } from 'framer-motion';

import ModalHeader from './_components/ModalHeader';
import AutocompleteInput from './_components/AutocompleteInput';
import ActionButtons from './_components/ActionButtons';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { location, setManualLocation, updateLocation } =
    useContext(LocationContext) || {};
  const [selectedState, setSelectedState] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [counties, setCounties] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [countySearch, setCountySearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);
  const countyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && location) {
      setSelectedState(location.state || '');
      setSelectedCounty(location.county || '');
      setStateSearch(location.state || '');
      setCountySearch(location.county || '');
    } else if (isOpen) {
      setSelectedState('');
      setSelectedCounty('');
      setStateSearch('');
      setCountySearch('');
    }
  }, [isOpen, location]);

  useEffect(() => {
    if (selectedState) {
      const stateCounties = allCounties[selectedState] || [];
      setCounties(stateCounties.sort());
    } else {
      setCounties([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        stateInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose, isOpen]);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedCounty('');
    setCountySearch('');
    setTimeout(() => countyInputRef.current?.focus(), 150);
  };

  const handleCountySelect = (county: string) => {
    setSelectedCounty(county);
  };

  const handleUpdateLocation = async () => {
    if (setManualLocation) {
      setIsUpdating(true);
      try {
        const newLocation = {
          latitude: 0,
          longitude: 0,
          region: location?.region || '',
          state: selectedState || undefined,
          country: 'United States',
          county: selectedCounty || undefined,
        };
        await setManualLocation(newLocation);
      } catch (error) {
        console.error('Error updating location:', error);
      } finally {
        setIsUpdating(false);
      }
    }
    onClose();
  };

  const handleUpdateAutomatically = async () => {
    if (updateLocation) {
      setIsUpdating(true);
      try {
        await updateLocation();
      } catch (error) {
        console.error('Error auto-detecting location:', error);
      } finally {
        setIsUpdating(false);
      }
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const isSaveDisabled = !selectedState && !selectedCounty;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-2xl w-full max-w-sm max-h-[85vh] overflow-visible relative"
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            <ModalHeader onClose={onClose} />

            <div className="space-y-5 mb-5">
              <AutocompleteInput
                label="State"
                value={stateSearch}
                onChange={setStateSearch}
                onSelect={handleStateSelect}
                options={states}
                placeholder="Search for your state..."
                inputRef={stateInputRef}
                selectedValue={selectedState}
              />

              <AutocompleteInput
                label="County"
                value={countySearch}
                onChange={setCountySearch}
                onSelect={handleCountySelect}
                options={counties}
                placeholder={
                  selectedState
                    ? 'Search for your county...'
                    : 'Select a state first'
                }
                disabled={!selectedState}
                inputRef={countyInputRef}
                selectedValue={selectedCounty}
              />
            </div>

            <ActionButtons
              onAutoDetect={handleUpdateAutomatically}
              onSave={handleUpdateLocation}
              isUpdating={isUpdating}
              isSaveDisabled={isSaveDisabled}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
