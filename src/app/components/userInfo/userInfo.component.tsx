
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Params, useNavigate, useParams } from 'react-router-dom';
import GenericButtonComponent from '../../shared/components/generic-button/generic-button.component';
import { User } from '../../shared/models/user.interface';
import { addUser, deleteUser, editUser } from '../../shared/redux/slices/users.slice';
import { RootState, useAppDispatch, useAppSelector } from '../../shared/redux/store/store';
import { UsersRemoteService } from '../../shared/services/remote/users/users.remote.service';
import styles from './userInfo.module.scss';
import { v4 as uuidv4 } from 'uuid';


interface UserInfoProps {
  option: "add" | "details" | "edition"
}

type FormValues = {
  first_name: string;
  last_name: string;
  email: string
};

interface Response {
  data: User,
  support: {
    url: string,
    text: string
  }
}

type EditableProps = "first_name" | "last_name" | "email"

export default function UserInfoComponent({option}: UserInfoProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [userToShow, setUserToShow] = useState<User>()
  const params: Params<string> = useParams()
  const userFromState: User | undefined = useAppSelector((state: RootState) => state.users.data.find((user) => user.id === params.id))

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (userToShow && option !== "add") {
      const user: User = {
        id: option === "edition"? userToShow.id : uuidv4(),
        first_name: data.first_name? data.first_name : userToShow.first_name,
        last_name: data.last_name? data.last_name : userToShow.last_name,
        email: data.email? data.email : userToShow.email,
        avatar: option === "edition"? userToShow?.avatar : undefined
      }
  
      dispatch(editUser({user}))
      navigate(`/details/${userToShow?.id}`)
    } else {
      const user: User = {
        id: uuidv4(),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      }
  
      dispatch(addUser({user}))
      navigate("/")
    }
  };


  useEffect(() => {
    if (userFromState) {
      setUserToShow(userFromState)
    } else if (params.id) {
      UsersRemoteService.getUser(params.id).then(async (fetch: any) => {
        const response: Response = await fetch.json()
        setUserToShow(response.data)
      })
    }
  }, [params.id, userFromState])

  const editableProps: Array<{key: EditableProps, name: string}> = [{
    key: "first_name",
    name: "First Name"
  },{
    key: "last_name",
    name: "Last Name"
  },{
    key: "email",
    name: "Email"
  }]

  const handleDeleteUser = (): void => {
    if (userToShow?.id) {
      dispatch(deleteUser({userId: userToShow.id}))
      navigate("/")
    }
  }

  const handleBackButtonClick = (): void => {
    option === "edition"? navigate(-1) : navigate("/")
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        <button type="button" className={styles.backButton} onClick={handleBackButtonClick}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 486.975 486.975">
            <g>
              <path d="M473.475,230.025h-427.4l116-116c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-139,139c-5.3,5.3-5.3,13.8,0,19.1
                l139,139c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-116-116h427.5c7.5,0,13.5-6,13.5-13.5
                S480.975,230.025,473.475,230.025z"/>
            </g>
          </svg>
        </button>

        <h1 className={styles.header}>{option === "add"? "New User" : `User ${option}`}</h1>

        {option !== "add"?
          <>
            <div className={styles.row}>{`Id: ${userToShow?.id}`}</div>
            {userToShow?.avatar? <img src={userToShow?.avatar} className={styles.form__avatar} alt="avatar"/> : ""}
          </>
          : ""
        }

        {editableProps.map((editableProp, index) => 
          <div key={index} className={styles.row}>
            <label>{editableProp.name}</label>
            <input
              {...register(editableProp.key)}
              data-testid={editableProp.key}
              className={option !== "details"? styles.input : `${styles.input} ${styles.input___disabled}`}
              defaultValue={userToShow? userToShow[editableProp.key] : undefined}
              disabled={option === "details"}/>
          </div>
        )}

        <footer className={styles.footer}>
          {option !== "details"?
            <input data-testid="submit" type="submit" className={styles.submit}/>
            : <>
              <GenericButtonComponent
                text={'Edit'}
                style={{marginRight: "1rem"}}
                handleClick={() => navigate(`/edition/${userToShow?.id}`)}/>

              <GenericButtonComponent
                text={'Delete'}
                style={{backgroundColor: "rgb(212, 50, 50)"}}
                handleClick={handleDeleteUser}/>
            </>
          }
        </footer>
      </form>
  );
}
