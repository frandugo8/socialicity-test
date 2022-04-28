import "@testing-library/react"
import ReactDOM from "react-dom"
import SearcherComponent from "./searcher.component";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SearcherComponent", () => {
  const label = "label"
  const handleSearch = jest.fn();
  const handleOptionSelected = jest.fn();

  const initialState = {
    placeholder: "test",
    dropdownOptions: [{
      key: "test",
      label
    }],
    handleSearch,
    handleOptionSelected
  }

  const setup = () => render(<SearcherComponent {...initialState}/>);


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearcherComponent {...initialState}/>, div);
  });

  it('after clicking details must remove default text', () => {
    setup()
    const dropDownButton = screen.getByTestId("dropDownButton")
    expect(screen.queryByText(label)).not.toBeInTheDocument()
    fireEvent.click(dropDownButton)
    expect(screen.getByText(label)).toBeInTheDocument()
  });

  it('after input text must send it to parent component', () => {
    setup()
    const input = screen.getByPlaceholderText(initialState.placeholder)
    fireEvent.input(input, {target: {value: 'text'}})
    expect(handleSearch).toHaveBeenCalled()
  });
})