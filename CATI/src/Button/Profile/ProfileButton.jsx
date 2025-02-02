import styles from './ProfileButton.module.css'
import icon from './account_circle.png';


function ProfileButton(){
    return (
        <button className={styles.profilebutton}>
            <img src={icon} alt="Ícone" className={styles.profilebuttonIcon} />
            <span>Profile</span>
        </button>
    )
}

export default ProfileButton