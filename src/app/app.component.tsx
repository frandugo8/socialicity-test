
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import UserInfoComponent from './components/userInfo/userInfo.component';
import UserListComponent from './components/userList/userList.component';


export default function AppComponent() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserListComponent/>}/>
          <Route path='/details/:id' element={<UserInfoComponent option={"details"}/>}/>
          <Route path='/edition/:id' element={<UserInfoComponent option={"edition"}/>}/>
          <Route path='/add' element={<UserInfoComponent option={"add"}/>}/>
          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
