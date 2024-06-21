'use client'
import Link from 'next/link'
import styles from './styles.module.css'

export const Header = () =>	 {
	return (
		<header className={styles.header}>
			<Link className={styles.logo} href='/'>Главная</Link>
			<ul className={styles.menu}>
				<Link href='/test'>Новое тестирование</Link>
				<Link href='/contacts'>Последние тестирования</Link>
				<Link href='/tests'>Тесты</Link>
			</ul>
		</header>
	)
}