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
				
				// Коли елемент стає видимим (більше 15% видимий)
				if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
					// Перевіряємо, чи вже немає класу animate
					if (!entry.target.classList.contains('animate')) {
						// Додаємо клас animate з затримкою
						setTimeout(() => {
							entry.target.classList.add('animate')
							console.log(`✅ Додано animate для: ${entry.target.className}`)
						}, 400)
					}
				} else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
					// Коли елемент виходить з видимості (менше 5% видимий) - прибираємо анімацію
					if (entry.target.classList.contains('animate')) {
						entry.target.classList.remove('animate')
						console.log(`❌ Видалено animate для: ${entry.target.className}`)
					}
				}
			})
		}, {
			// Налаштування observer з меншою кількістю порогів
			threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.7, 1], // Оптимізовані пороги
			rootMargin: '0px 0px -30px 0px' // Збільшено margin для стабільності
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

// Підсвічування активного пункту меню
document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('.nav__link')
	const sections = document.querySelectorAll('section[id]')
	
	// Функція для оновлення активного пункту меню
	function updateActiveNavLink() {
		let current = ''
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 200 // Відступ для фіксованого хедера
			const sectionHeight = section.clientHeight
			
			if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
				current = section.getAttribute('id')
			}
		})
		
		// Видаляємо активний клас з усіх посилань
		navLinks.forEach(link => {
			link.classList.remove('nav__link--active')
		})
		
		// Додаємо активний клас до поточного пункту меню
		navLinks.forEach(link => {
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('nav__link--active')
			}
		})
	}
	
	// Плавний скрол до секцій при кліку на пункти меню
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault()
			
			const targetId = this.getAttribute('href').substring(1)
			const targetSection = document.getElementById(targetId)
			
			if (targetSection) {
				const headerHeight = document.querySelector('.header').offsetHeight
				const targetPosition = targetSection.offsetTop - headerHeight - 20
				
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				})
			}
		})
	})
	
	// Викликаємо функцію при скролі
	window.addEventListener('scroll', updateActiveNavLink)
	
	// Викликаємо функцію при завантаженні сторінки
	updateActiveNavLink()
})


