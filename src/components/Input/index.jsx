import styles from './styles.module.css'
export const Input = ({ ...props }) => {
	return <input type={props.type} className={styles.input} placeholder={props.label}  />
}