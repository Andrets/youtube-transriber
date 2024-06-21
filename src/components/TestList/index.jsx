import styles from './styles.module.css'
import { TestCard } from './testCard'

export const TestList = () => {
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
						<TestCard test={item} />
					</li>
				))}
			</ul>
		) : (
			<p>Тесты</p>
		)}
		</>
	);
};