import styles from './styles.module.css'

export const NewTestCard = ({ test }) => {
	return (
		<div className={styles.card}>
			<p>{test.name}</p>
		</div>
	)
}