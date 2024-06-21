import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
	title: 'Register',
	description: 'Register Page',
}

export default function RegisterPage() {
	return (
		<main className={styles.main}>
			<div className={styles.register__container}>
				<h1 className={styles.register__title}>Регистрация</h1>
				<form className={styles.register__form}>
					<Input label="Логин..." type="text" />
					<Input label="Пароль..." type="password" />
					<Input label="Почта..." type="email" />
					<Input label="Подтверждение пароля..." type="password" />
					<Button type="submit">Зарегистрироваться</Button>
				</form>
				<Link href="/login" className={styles.login__link}>Войти</Link>
			</div>
		</main>
	);
}