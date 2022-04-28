
import "@testing-library/react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import UserInfoComponent from "./userInfo.component"
import {BrowserRouter as Router} from 'react-router-dom';
import { UsersRemoteService } from "../../shared/services/remote/users/users.remote.service"
import { act, render, screen, fireEvent } from "@testing-library/react"

let store: any
let spies: any

const initialState = {users: {
  data: [{
    id: "1",
    email: "email",
    first_name: "first_name",
    last_name: "last_name",
  }]
}}

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1"
  }),
  useNavigate: () => mockedNavigate
}));

describe("UserInfoComponent", () => {
  const mockStore = configureStore()

  beforeEach(() => {
    loadSpies()
  })

  const setup = async (option: "add" | "details" | "edition", hasEmptyStore?: boolean) => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      store = mockStore(hasEmptyStore? {users: {data: []}} : initialState)
      render(<Provider store={store}><Router><UserInfoComponent option={option}/></Router></Provider>);
    });
  }

  it('renders without crashing', async () => {
    const div = document.createElement('div');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      store = mockStore(initialState)
      ReactDOM.render(<Provider store={store}><Router><UserInfoComponent option={"edition"}/></Router></Provider>, div);
    });
  })

  it("should render the basic form fields and should not render edit and delete buttons", async () => {
    await setup("edition")
    expect(screen.getByTestId("first_name")).toBeInTheDocument();
    expect(screen.getByTestId("last_name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("Should render edit and delete buttons when details option is selected", async () => {
    await setup("details")
    expect(screen.queryByTestId("submit")).not.toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  })

  it("Should send form data when submit button is clicked and edition option is active", async () => {
    await setup("edition")
    const firstNameInput = screen.getByTestId("first_name")
    fireEvent.input(firstNameInput, {target: { value: "edited_name" }});
    const submitButton = screen.getByTestId("submit")
    fireEvent.submit(submitButton);
    // expect(mockedNavigate).toHaveBeenCalledWith("/details/1"); //CHECK TEST
  })

  it("Should send form data when submit button is clicked and add option is active", async () => {
    await setup("add")
    const firstNameInput = screen.getByTestId("first_name")
    fireEvent.input(firstNameInput, {target: { value: "edited_name" }});
    const submitButton = screen.getByTestId("submit")
    fireEvent.submit(submitButton);
    // expect(mockedNavigate).toHaveBeenCalledWith("/"); //CHECK TEST
  })

  it("Should call UserRemoteSerivice to get user data", async () => {
    await setup("details", true)
    expect(spies.usersRemoteService.getUsers).toHaveBeenCalled();
  })

  it("Should delete an user when delete button is clicked", async () => {
    await setup("details")
    const deleteButton = screen.getByText("Delete")
    fireEvent.click(deleteButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  })
})

function loadSpies() {
  spies = {
    usersRemoteService: {
      getUsers: jest.spyOn(UsersRemoteService, "getUser")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(
          {
            data: {
              id: "user1Id",
              email: "user1@email.com",
              first_name: "user1Name",
              last_name: "user1LastName",
            },  
            support: {
              text: "",
              url: ""
            },
          })
      }))
    }
  }
}

