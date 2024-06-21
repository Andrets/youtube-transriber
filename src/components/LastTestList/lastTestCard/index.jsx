import styles from './styles.module.css'
export const LastTestCard = ({ test }) => {
	return <div className={styles.card}>{test.name}</div>;
}