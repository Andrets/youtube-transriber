import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
	title: 'Login',
	description: 'Login Page',
}

export default function Login() {


	return (
		<main className={styles.main}>
			<div className={styles.login__container}>
				<h1 className={styles.login__title}>Вход</h1>
				<form className={styles.login__form}>
					<Input label="Логин..." type="text" />
					<Input label="Пароль..." type="password" />
					<Button type="submit">Войти</Button>
				</form>
				<Link href="/register" className={styles.register__link}>Зарегистрироваться</Link>
			</div>
		</main>
	);
};