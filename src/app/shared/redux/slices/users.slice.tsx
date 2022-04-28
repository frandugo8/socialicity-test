import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user.interface";

const initialState: {
  data: Array<User>
  loadedPages: Array<number>
} = {
  data: [],
  loadedPages: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{users: Array<User>, page: number}>) => {
      state.data = state.data.concat(action.payload.users).map((user) => {
        user.id = user.id.toString()
        return user
      })
      state.loadedPages.push(action.payload.page)
    },

    addUser: (state, action: PayloadAction<{user: User}>) => {
      state.data.push(action.payload.user)
    },

    editUser: (state, action: PayloadAction<{user: User}>) => {
      const index = state.data.findIndex((user => user.id === action.payload.user.id));

      if (index !== undefined) {
        state.data[index] = action.payload.user
      }
    },

    deleteUser: (state, action: PayloadAction<{userId: string}>) => {
      state.data = state.data.filter((user) => user.id !== action.payload.userId)
    }
  }
})

export const { setUsers, addUser, editUser, deleteUser } = usersSlice.actions


export default usersSlice.reducer