
import "@testing-library/react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from 'react-router-dom';
import UserListComponent from "./userList.component";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import { UsersRemoteService } from "../../shared/services/remote/users/users.remote.service";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "@testing-library/react"

let spies: any

describe("UserListRow Component", () => {
  const initialState = {users: {
    data: [],
    loadedPages: []
  }}

  const mockedNavigate = jest.fn();
  let store
  const mockStore = configureStore()

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }));

  const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 50 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 50 });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', (originalOffsetHeight as any));
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', (originalOffsetWidth as any));
  });

  beforeEach(() => {
    loadSpies()
  })

  const setup = async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      store = mockStore(initialState)
      render(<Provider store={store}><Router><UserListComponent/></Router></Provider>)
    });
  }

  it('renders without crashing', async () => {
    const div = document.createElement('div');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      store = mockStore(initialState)
      ReactDOM.render(<Provider store={store}><Router><UserListComponent/></Router></Provider>, div);
    });
  });

  it('must load initial boards data', async () => {
    await setup()
  
    expect(spies.usersRemoteService.getUsers).toHaveBeenCalledWith(1);
  })

  it('must search', async () => {
    await setup()

    const input = screen.getByPlaceholderText(/Search by/i)
    fireEvent.input(input, {target: {value: 'text'}})
  })

  it('must set search options', async () => {
    await setup()

    const button = screen.getByTestId("dropDownButton")
    fireEvent.click(button)
    const dropDownRow = screen.getByText("Last Name")
    expect(dropDownRow).toBeInTheDocument()
    fireEvent.click(dropDownRow)
    expect(dropDownRow).not.toBeInTheDocument()
  })

  it('must set sort options', async () => {
    await setup()

    const sortButton = screen.getByTestId("first_name_ascendingSortButton")
    fireEvent.click(sortButton)
  })
})

function loadSpies() {
  spies = {
    usersRemoteService: {
      getUsers: jest.spyOn(UsersRemoteService, "getUsers")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(
          {
            data: [{
              id: "user1Id",
              email: "user1@email.com",
              first_name: "user1Name",
              last_name: "user1LastName",
            },{
              id: "user2Id",
              email: "user2@email.com",
              first_name: "user2Name",
              last_name: "user2LastName",
            }],
            page: 1,
            per_page: 6,
            support: {
              text: "",
              url: ""
            },
            total: 12,
            total_pages: 2
          })
      }))
    }
  }
}

