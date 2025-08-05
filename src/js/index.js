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
function updateActiveNavItem() {
	const sections = document.querySelectorAll('section[id]')
	const navLinks = document.querySelectorAll('.nav__link')
	
	// Отримуємо поточну позицію скролу
	const scrollPosition = window.scrollY + 100 // Додаємо відступ для кращої реакції
	
	// Знаходимо поточну секцію
	let currentSection = ''
	
	sections.forEach(section => {
		const sectionTop = section.offsetTop
		const sectionHeight = section.offsetHeight
		
		if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
			currentSection = section.getAttribute('id')
		}
	})
	
	// Оновлюємо активний пункт меню
	navLinks.forEach(link => {
		link.classList.remove('nav__link--active')
		
		if (link.getAttribute('href') === `#${currentSection}`) {
			link.classList.add('nav__link--active')
		}
	})
}

// Додаємо обробники подій
window.addEventListener('scroll', updateActiveNavItem)
window.addEventListener('load', updateActiveNavItem)

// Плавний скрол для навігаційних посилань
document.querySelectorAll('.nav__link').forEach(link => {
	link.addEventListener('click', function(e) {
		e.preventDefault()
		
		const targetId = this.getAttribute('href')
		const targetSection = document.querySelector(targetId)
		
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


