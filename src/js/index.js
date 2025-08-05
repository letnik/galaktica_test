// Анімація для accent елементів
document.addEventListener('DOMContentLoaded', function() {
	// Знаходимо всі accent елементи
	const accentElements = document.querySelectorAll('.hero__title-accent, .about__title-accent, .services__title-accent')
	
	// Діагностика
	console.log('🔍 Знайдено accent елементів:', accentElements.length)
	accentElements.forEach((element, index) => {
		console.log(`📋 Елемент ${index + 1}: ${element.className} - "${element.textContent.trim()}"`)
	})
	

	
	// Перевіряємо підтримку Intersection Observer
	if ('IntersectionObserver' in window) {
		// Створюємо Intersection Observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				console.log(`[${entry.target.className}] isIntersecting: ${entry.isIntersecting}, ratio: ${entry.intersectionRatio.toFixed(2)}`)
				
				// Коли елемент стає видимим (більше 10% видимий)
				if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
					// Додаємо клас animate з затримкою
					setTimeout(() => {
						entry.target.classList.add('animate')
						console.log(`✅ Додано animate для: ${entry.target.className}`)
					}, 400)
				} else {
					// Коли елемент виходить з видимості - прибираємо анімацію відразу
					entry.target.classList.remove('animate')
					console.log(`❌ Видалено animate для: ${entry.target.className}`)
				}
			})
		}, {
			// Налаштування observer з порогами
			threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 1], // Додано більше порогів для точнішого відстеження
			rootMargin: '0px 0px -20px 0px' // Зменшено margin для більш точної реакції
		})
		
		// Додаємо кожен елемент до спостереження
		accentElements.forEach(element => {
			observer.observe(element)
			console.log(`👁️ Додано до спостереження: ${element.className}`)
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


