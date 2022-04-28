
import { SortOptions } from '../../../../shared/models/sort-options.interface';
import styles from './userList-category.module.scss';

interface UserListCategoryProps {
  text: string
  id: string
  sortOptions: SortOptions
  setSortOptions: React.Dispatch<React.SetStateAction<SortOptions>>
}

type OptionsTypes = "ascending" | "descending"

export default function UserListCategoryComponent({text, id, sortOptions, setSortOptions}: UserListCategoryProps) {
  const OPTIONS: Array<OptionsTypes> = ["ascending", "descending"]

  const handleSort = (order: "ascending" | "descending") => {
    const isSame = sortOptions.id === id && order === sortOptions.order

    setSortOptions({
      id: !isSame? id : undefined,
      order: !isSame? order : undefined
    })
  }

  return (
    <div className={styles.category}>
      <div className={styles.category__text}>{text}</div>
      <div className={styles.sortWrapper}>
        {OPTIONS.map((option: OptionsTypes, index: number) => 
          <button
            key={index}
            style={option === "ascending"? {transform: "rotate(180deg)"} : {}}
            type="button"
            className={sortOptions.id === id && sortOptions.order === option? 
              `${styles.sortWrapper__button} ${styles.sortWrapper__button___isSelected}` : styles.sortWrapper__button}
            data-testid={`${id}_${option}SortButton`}
            onClick={() => handleSort(option)}>

            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="52px" height="52px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52">
              <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"/>
            </svg>

          </button>
        )}
      </div>
    </div>
  );
}
