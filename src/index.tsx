import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

//Создание корневого узла
//Находим элемент с id="root" в HTML-документе, который будет служить корневым узлом для нашего React-приложения.

const domNode = document.getElementById('root') as HTMLDivElement;

//Создаем корень приложения с помощью createRoot.

const root = createRoot(domNode);

//Основной компонент приложения
//Состояние: Используем хук useState для управления состоянием текущей статьи.
//Начальное состояние берется из defaultArticleState, который, содержит значения по умолчанию для различных параметров статьи.

//Стиль: В компоненте <main> применяются динамические CSS-переменные, которые зависят от состояния статьи.
//Это позволяет изменять стили в зависимости от выбранных параметров.

// Компоненты:
//<ArticleParamsForm />: Компонент формы, который позволяет пользователю изменять параметры статьи (шрифт, размер текста, цвет и т.д.).
//Он получает текущее состояние статьи и функцию для его обновления.
//<Article />: Компонент, который отображает саму статью. Его содержимое будет зависеть от состояния currentArticleState.

//Рендеринг приложения
//Приложение рендерится в строгом режиме (StrictMode), который помогает выявлять потенциальные проблемы в приложении.

const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentArticleState={currentArticleState}
				setCurrentArticleState={setCurrentArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
