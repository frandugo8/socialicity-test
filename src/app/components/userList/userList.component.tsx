import React, { useEffect, useRef, useState } from 'react';
import SearcherComponent from '../../shared/components/searcher/searcher.component';
import { List, AutoSizer } from 'react-virtualized';
import { User } from '../../shared/models/user.interface';
import { setUsers } from '../../shared/redux/slices/users.slice';
import { RootState, useAppDispatch, useAppSelector } from '../../shared/redux/store/store';
import { UsersRemoteService } from '../../shared/services/remote/users/users.remote.service';
import styles from './userList.module.scss';
import UserListRowComponent from './components/userList-row/userList-row.component';
import GenericButtonComponent from '../../shared/components/generic-button/generic-button.component';
import { useNavigate } from 'react-router-dom';
import UserListCategoryComponent from './components/userList-category/userList-category.component';
import { SortOptions } from '../../shared/models/sort-options.interface';

interface Response {
  data: Array<User>
  page: number
  per_page: number
  support: {
    text: string
    url: string
  }
  total: number
  total_pages: number
}

const SEARCH_DROPDOWN_OPTIONS = [{
  key: "first_name",
  label: "First Name"
},{
  key: "last_name",
  label: "Last Name"
},{
  key: "email",
  label: "Email"
}]

export default function UserListComponent() {
  const [totalPages, setTotalPages] = useState<number>(0)
  const [lastLoadedPage, setLastLoadedPage] = useState<number | undefined>(undefined)
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    id: undefined,
    order: undefined
  })
  const scrollRef= useRef<any>()
  const users = useAppSelector((state: RootState) => state.users)
  const [usersToShow, setUsersToShow] = useState<Array<User>>([])
  const [searchType, setSearchType] = useState<string>("first_name")
  const [search, setSearch] = useState<string>("")
  const isLoading = useRef<any>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSearch = (text: string): void => {
    setSearch(text)
  }

  useEffect(() => {
    if (searchType === "first_name" || searchType === "last_name" || searchType === "email") {
      let result = users.data.slice().filter((user: User) => user[searchType].toLowerCase().startsWith(search.toLocaleLowerCase()))

      if (sortOptions.id && (sortOptions.id === "first_name" || sortOptions.id === "last_name" || sortOptions.id === "email")) {
        const id: "first_name" | "last_name" | "email" = sortOptions.id
        result.sort((a: User, b: User) => sortOptions.order === "descending"? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]))
      }

      setUsersToShow(result)
    }
  }, [users, search, searchType, sortOptions])

  const getUsers = (page: number): void => {
    isLoading.current = true

    if (users.loadedPages.indexOf(page) === -1) {
      UsersRemoteService.getUsers(page).then(async (fetch: any) => {
        const response: Response = await fetch.json() 
        setLastLoadedPage(response.page)
        setTotalPages(response.total_pages)
        dispatch(setUsers({users: response.data, page: response.page}))
      }).finally(() => {
        isLoading.current = false
      })
    }
  }

  useEffect(() => {
    getUsers(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScroll = async (e: any) => {
    if (e.scrollTop + e.clientHeight >= e.scrollHeight && e.scrollHeight !== 0
          && lastLoadedPage && lastLoadedPage < totalPages && !isLoading.current) {
      getUsers(lastLoadedPage + 1)
    }
  };

  const rowRenderer = ({
    key,
    index,
    style
    }: any) => {
      const user = usersToShow[index]

      return <UserListRowComponent key={key} user={user} style={style}/>
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <h1 className={styles.header__title}>Users List</h1>

        <div className={styles.header__addButton}>
          <GenericButtonComponent text={"Añadir usuario"} handleClick={() => navigate(`/add`)}/>
        </div>

        <SearcherComponent
          placeholder={`Search by ${searchType}`}
          dropdownOptions={SEARCH_DROPDOWN_OPTIONS}
          handleSearch={handleSearch}
          handleOptionSelected={setSearchType}/>
      </div>

      <div className={styles.body}>

        <div className={styles.categories}>
          <UserListCategoryComponent text={'FIRST NAME'} id={"first_name"} sortOptions={sortOptions} setSortOptions={setSortOptions}/>
          <UserListCategoryComponent text={'LAST NAME'} id={"last_name"} sortOptions={sortOptions} setSortOptions={setSortOptions}/>
          <UserListCategoryComponent text={'EMAIL'} id={"email"} sortOptions={sortOptions} setSortOptions={setSortOptions}/>
        </div>

        <div className={styles.scrollWrapper}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                className={styles.scrollWrapper__list}
                width={width}
                height={height}
                rowHeight={112}
                rowCount={usersToShow.length}
                ref={scrollRef}
                onScroll={handleScroll}
                rowRenderer={rowRenderer}
                scrollToAlignment="start"
              />
            )}
          </AutoSizer>
        </div>
        
      </div>
    </div>
  );
}
