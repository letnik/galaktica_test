// Анімація для accent елементів
document.addEventListener('DOMContentLoaded', function() {
	// Знаходимо всі accent елементи
	const accentElements = document.querySelectorAll('.hero__title-accent, .about__title-accent, .services__title-accent')
	

	
	// Перевіряємо підтримку Intersection Observer
	if ('IntersectionObserver' in window) {
		// Створюємо Intersection Observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				// Коли елемент стає видимим (більше 10% видимий)
				if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
					// Додаємо клас animate з затримкою
					setTimeout(() => {
						entry.target.classList.add('animate')
					}, 400)
				} else {
					// Коли елемент виходить з видимості - прибираємо анімацію відразу
					entry.target.classList.remove('animate')
				}
			})
		}, {
			// Налаштування observer з порогами
			threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1], // Різні пороги для плавної анімації
			rootMargin: '0px 0px -30px 0px'
		})
		
		// Додаємо кожен елемент до спостереження
		accentElements.forEach(element => {
			observer.observe(element)
		})
	} else {
		// Fallback для старих браузерів - анімація запуститься одразу
		accentElements.forEach(element => {
			setTimeout(() => {
				element.classList.add('animate')
			}, 500)
		})
	}
})


