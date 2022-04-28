
import "@testing-library/react"
import { UsersRemoteService } from "./users.remote.service";

describe("UsersRemoteService", () => {
  let fetch: typeof global.fetch;

  beforeAll(() => {
    fetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = fetch;
  });

  it('should get users data when getUsers method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}])
    const page = 1
    const users = await UsersRemoteService.getUsers(page)
  
    expect(global.fetch).toHaveBeenCalledWith(
      `https://reqres.in/api/users?page=${page}`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    )

    expect(users).toStrictEqual([{}])
  })

  it('should get user info when getUsers method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}])
    const userId = "1"
    const users = await UsersRemoteService.getUser(userId)
  
    expect(global.fetch).toHaveBeenCalledWith(
      `https://reqres.in/api/users/${userId}`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    )

    expect(users).toStrictEqual([{}])
  })
})