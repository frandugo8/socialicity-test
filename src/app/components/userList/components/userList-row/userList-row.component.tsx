
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../shared/models/user.interface';
import styles from './userList-row.module.scss';

interface UserListRowProps {
  user: User
  style?: React.CSSProperties
}

export default function UserListRowComponent({user, style}: UserListRowProps) {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate(`/details/${user.id}`)
  }

  return (
    <div
      style={style}
      data-testid="userListRow"
      className={styles.row}
      onClick={handleClick}>
      <div className={styles.row__category}>{user.first_name}</div>
      <div className={styles.row__category}>{user.last_name}</div>
      <div className={styles.row__category}>{user.email}</div>
    </div>
  );
}
