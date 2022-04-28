
import { SearcherDropdownOption } from '../../../../models/searcher-dropdown.interface';
import styles from './searcher-dropdown.module.scss';

interface SearcherDropdownProps {
  options: Array<SearcherDropdownOption>
  handleSelection(option: string): void
}

export default function SearcherDropdownComponent({options, handleSelection}: SearcherDropdownProps) {
  return (
    <div className={styles.dropdown}>
      {options.map((option: SearcherDropdownOption, index: number) => 
        <div key={index} className={styles.dropdown__row} onClick={() => handleSelection(option.key)}>{option.label}</div>
      )}
    </div>
  );
}
