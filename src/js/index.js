// Анімація для accent елементів
document.addEventListener('DOMContentLoaded', function() {
	// Знаходимо всі accent елементи
	const accentElements = document.querySelectorAll('.hero__title-accent, .about__title-accent, .services__title-accent')
	
	// Перевіряємо підтримку Intersection Observer
	if ('IntersectionObserver' in window) {
		// Створюємо Intersection Observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				// Коли елемент стає видимим
				if (entry.isIntersecting) {
					// Додаємо клас animate з невеликою затримкою
					setTimeout(() => {
						entry.target.classList.add('animate')
					}, 200)
					
					// Припиняємо спостереження після анімації
					observer.unobserve(entry.target)
				}
			})
		}, {
			// Налаштування observer
			threshold: 0.3, // Анімація запуститься коли 30% елемента буде видимим
			rootMargin: '0px 0px -50px 0px' // Додаткова затримка знизу
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


