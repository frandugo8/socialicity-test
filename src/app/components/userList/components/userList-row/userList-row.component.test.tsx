
import "@testing-library/react"
import ReactDOM from "react-dom"
import UserListRowComponent from "./userList-row.component";
import { render, screen, fireEvent } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("UserListRow Component", () => {
  const user = {
    id: "testId",
    email: "email",
    first_name: "test",
    last_name: "test",
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><UserListRowComponent user={user}/></Router>, div);
  });

  it('navigate to user details after clicking a row', () => {
    render(<Router><UserListRowComponent user={user}/></Router>)
    const row = screen.getByTestId("userListRow")
    fireEvent.click(row)
    expect(mockedNavigate).toHaveBeenCalledWith("/details/testId");
  });
})

