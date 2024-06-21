import styles from './styles.module.css'
export const Button = ({ children, ...props }) => {
	return <button className={styles.button} {...props}>{children}</button>;
};