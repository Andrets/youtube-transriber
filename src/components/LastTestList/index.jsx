import { LastTestCard } from './lastTestCard'
import styles from './styles.module.css'

export const LastTestList = () => {
	const list = [
		// { id: 1, name: 'test1' },
		// { id: 2, name: 'test2' },
		// { id: 3, name: 'test3' },
	]
	return (
		<>
		{list.length > 0 ? (
			<ul className={styles.list}>
				{list.map((item) => (
					<li key={item.id}>
						<LastTestCard test={item} />
					</li>
				))}
			</ul>
		) : (
			<p>Последние тестирования</p>
		)}
		</>
	);
};