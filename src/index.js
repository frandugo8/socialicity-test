
import ReactDOM from 'react-dom';
import AppComponent from './app/app.component';
import reportWebVitals from './reportWebVitals';
import { store } from "./app/shared/redux/store/store"
import { Provider } from 'react-redux';

// CSS Global Styles
import './app/shared/styles/generic/generic-styles.scss';

const app = document.getElementById('root');

ReactDOM.render(
    <Provider store = {store}>
      <AppComponent/>
    </Provider>,
app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
