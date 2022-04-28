
import reducer, { addUser, deleteUser, editUser, setUsers } from './users.slice'

const users = [{
  id: "testId1",
  email: "test1",
  first_name: "test1",
  last_name: "test1",
},
{
  id: "testId2",
  email: "test2",
  first_name: "test2",
  last_name: "test2",
}]

let result
let previousState

describe("UsersSlice", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({"data": [], "loadedPages": []})
  })

  it('should set users', () => {
    previousState = {data: [], loadedPages: []}
  
    expect(reducer(previousState, setUsers({users, page: 1}))).toEqual({data: users, loadedPages: [1]})
  })

  it('should add an user', () => {
    previousState = {data: users, loadedPages: [1]}
    const user = {
      id: "testId3",
      email: "test3",
      first_name: "test3",
      last_name: "test3"
    }

    result = [{
      id: "testId1",
      email: "test1",
      first_name: "test1",
      last_name: "test1",
    },
    {
      id: "testId2",
      email: "test2",
      first_name: "test2",
      last_name: "test2",
    },{
      id: "testId3",
      email: "test3",
      first_name: "test3",
      last_name: "test3"
    }]
  
    expect(reducer(previousState, addUser({user}))).toEqual({data: result, loadedPages: [1]})
  })

  it('should edit an user', () => {
    previousState = {data: users, loadedPages: [1]}
    const user = {
      id: "testId2",
      email: "edited1",
      first_name: "edited1",
      last_name: "edited1",
    }

    result = [{
      id: "testId1",
      email: "test1",
      first_name: "test1",
      last_name: "test1",
    },
    {
      id: "testId2",
      email: "edited1",
      first_name: "edited1",
      last_name: "edited1",
    }]
  
    expect(reducer(previousState, editUser({user}))).toEqual({data: result, loadedPages: [1]})
  })

  it('should delete an user', () => {
    previousState = {data: users, loadedPages: [1]}
    const userId = "testId2"

    result = [{
      id: "testId1",
      email: "test1",
      first_name: "test1",
      last_name: "test1",
    }]
  
    expect(reducer(previousState, deleteUser({userId}))).toEqual({data: result, loadedPages: [1]})
  })
})



