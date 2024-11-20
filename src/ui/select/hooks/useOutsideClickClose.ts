import { useEffect } from 'react';

//Пользовательский хук useOutsideClickClose, который позволяет закрывать элемент при клике вне его.

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	//Добавляем тип события, которое будет прослушиваться. По умолчанию это 'click', но может быть также 'mousedown'.
	event?: 'click' | 'mousedown';
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
	event = 'click',
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener(event, handleClick);

		return () => {
			window.removeEventListener(event, handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
