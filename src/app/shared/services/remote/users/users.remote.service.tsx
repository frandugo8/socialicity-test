
export const UsersRemoteService = {
    getUsers: (page?: number): Promise<any> => {
      return fetch(`https://reqres.in/api/users${page !== undefined? `?page=${page}` : ""}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },

    getUser: (userId: string): Promise<any> => {
      return fetch(`https://reqres.in/api/users/${userId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }