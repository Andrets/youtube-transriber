import styles from './styles.module.css'
export const TestCard = ({ test }) => {
	return <div className={styles.card}>{test.name}</div>;
}