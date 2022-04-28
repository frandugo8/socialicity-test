
import "@testing-library/react"
import ReactDOM from "react-dom"
import { render, screen, fireEvent } from "@testing-library/react";
import UserListCategoryComponent from "./userList-category.component";


describe("UserListCategoryComponent", () => {
  const setSortOptions = jest.fn();
  const order: "ascending" | "descening" | undefined = "ascending"

  const props = {
    text: "FIRST NAME",
    id: "first_name",
    sortOptions: {
      id: undefined,
      order
    },
    setSortOptions
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserListCategoryComponent {...props}/>, div);
  });

  it('should apply a sorting after clicking sort button', () => {
    render(<UserListCategoryComponent {...props}/>)
    const sortButton = screen.getByTestId("first_name_ascendingSortButton")
    fireEvent.click(sortButton)
    expect(setSortOptions).toHaveBeenCalled()
  });
})

