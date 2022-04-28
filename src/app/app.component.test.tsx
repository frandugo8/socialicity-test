
import "@testing-library/react"
import AppComponent from "./app.component"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

let store: any
const initialState = {dispatch: {}, boards: []}

describe("AppComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><AppComponent/></Provider>, div);
  })
})

