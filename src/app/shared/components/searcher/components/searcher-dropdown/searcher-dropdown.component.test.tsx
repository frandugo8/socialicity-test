
import "@testing-library/react"
import ReactDOM from "react-dom"
import { SearcherDropdownOption } from "../../../../models/searcher-dropdown.interface";
import SearcherDropdownComponent from "./searcher-dropdown.component";

describe("SearcherDropdown", () => {
  const options: Array<SearcherDropdownOption> = [{
    key: "test",
    label: "label"
  }]

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearcherDropdownComponent options={options} handleSelection={() => ""}/>, div);
  });
})

