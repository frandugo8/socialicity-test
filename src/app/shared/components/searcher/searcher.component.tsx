
import React, { useRef, useState } from 'react';
import { SearcherDropdownOption } from '../../models/searcher-dropdown.interface';
import SearcherDropdownComponent from './components/searcher-dropdown/searcher-dropdown.component';
import styles from './searcher.module.scss';

interface SearcherProps {
  placeholder: string
  dropdownOptions: Array<SearcherDropdownOption>
  handleSearch(text: string): void
  handleOptionSelected(option: string): void
}

export default function SearcherComponent({placeholder, dropdownOptions, handleSearch, handleOptionSelected}: SearcherProps) {
  const inputRef = useRef<any>()
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)

  const handleKeyDown = (): void => {
    handleSearch(inputRef.current.value)
  }

  const toggleDropDown = (): void => {
    setIsDropDownOpen(!isDropDownOpen)
  }

  return (
    <div className={styles.searcher}>
      <div data-testid="dropDownButton" className={styles.dropDownButton} onClick={toggleDropDown}>
        {isDropDownOpen?
          <SearcherDropdownComponent
            options={dropdownOptions}
            handleSelection={handleOptionSelected}/>
          : ""}
      </div>

      <div className={styles.icon}/>

      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className={styles.searcher__input}
        onInput={handleKeyDown}/>
    </div>
  );
}
