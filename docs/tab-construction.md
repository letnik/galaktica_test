# Конструкція таб-меню для Galaktica Test

*Дата створення: 23 грудня 2024*

## 📋 Опис конструкції

Таб-меню - це інтерактивний елемент навігації, який дозволяє переключатися між різними секціями контенту без перезавантаження сторінки.

## 🎯 Функціональні вимоги

### Основні функції
- Переключення між секціями (Home, About, Services, Contact)
- Плавні анімації переходів
- Підсвічування активного табу
- Адаптивність для мобільних пристроїв
- Підтримка клавіатурної навігації

### Стани табу
1. **Неактивний**: Звичайний стан без підсвічування
2. **Активний**: Підсвічений з індикатором
3. **Hover**: Ефект при наведенні
4. **Focus**: Ефект при фокусі (для доступності)

## 🏗️ HTML структура

```html
<!-- Таб-навігація -->
<nav class="tab-navigation" role="tablist" aria-label="Основна навігація">
  <button class="tab-btn tab-btn--active" 
          role="tab" 
          aria-selected="true" 
          aria-controls="home-content"
          id="home-tab">
    Home
  </button>
  <button class="tab-btn" 
          role="tab" 
          aria-selected="false" 
          aria-controls="about-content"
          id="about-tab">
    About
  </button>
  <button class="tab-btn" 
          role="tab" 
          aria-selected="false" 
          aria-controls="services-content"
          id="services-tab">
    Services
  </button>
  <button class="tab-btn" 
          role="tab" 
          aria-selected="false" 
          aria-controls="contact-content"
          id="contact-tab">
    Contact
  </button>
</nav>

<!-- Контент секцій -->
<div class="tab-content">
  <section id="home-content" 
           class="tab-panel tab-panel--active" 
           role="tabpanel" 
           aria-labelledby="home-tab">
    <!-- Контент Home секції -->
  </section>
  
  <section id="about-content" 
           class="tab-panel" 
           role="tabpanel" 
           aria-labelledby="about-tab">
    <!-- Контент About секції -->
  </section>
  
  <section id="services-content" 
           class="tab-panel" 
           role="tabpanel" 
           aria-labelledby="services-tab">
    <!-- Контент Services секції -->
  </section>
  
  <section id="contact-content" 
           class="tab-panel" 
           role="tabpanel" 
           aria-labelledby="contact-tab">
    <!-- Контент Contact секції -->
  </section>
</div>
```

## ⚡ JavaScript логіка

```javascript
class TabManager {
  constructor() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.panels = document.querySelectorAll('.tab-panel');
    this.activeTab = document.querySelector('.tab-btn--active');
    
    this.init();
  }
  
  init() {
    // Додаємо обробники подій
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.switchTab(e));
      tab.addEventListener('keydown', (e) => this.handleKeyboard(e));
    });
    
    // Ініціалізуємо перший таб
    this.showPanel(this.activeTab.getAttribute('aria-controls'));
  }
  
  switchTab(event) {
    const clickedTab = event.currentTarget;
    const targetPanel = clickedTab.getAttribute('aria-controls');
    
    // Оновлюємо активний таб
    this.updateActiveTab(clickedTab);
    
    // Показуємо відповідну панель
    this.showPanel(targetPanel);
  }
  
  updateActiveTab(newActiveTab) {
    // Видаляємо активний клас з усіх табів
    this.tabs.forEach(tab => {
      tab.classList.remove('tab-btn--active');
      tab.setAttribute('aria-selected', 'false');
    });
    
    // Додаємо активний клас до нового табу
    newActiveTab.classList.add('tab-btn--active');
    newActiveTab.setAttribute('aria-selected', 'true');
    
    this.activeTab = newActiveTab;
  }
  
  showPanel(panelId) {
    // Приховуємо всі панелі
    this.panels.forEach(panel => {
      panel.classList.remove('tab-panel--active');
    });
    
    // Показуємо цільову панель
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add('tab-panel--active');
    }
  }
  
  handleKeyboard(event) {
    const currentTab = event.currentTarget;
    const tabIndex = Array.from(this.tabs).indexOf(currentTab);
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextTab = this.tabs[(tabIndex + 1) % this.tabs.length];
        nextTab.focus();
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevTab = this.tabs[(tabIndex - 1 + this.tabs.length) % this.tabs.length];
        prevTab.focus();
        break;
        
      case 'Home':
        event.preventDefault();
        this.tabs[0].focus();
        break;
        
      case 'End':
        event.preventDefault();
        this.tabs[this.tabs.length - 1].focus();
        break;
    }
  }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  new TabManager();
});
```

## 🎯 Особливості реалізації

### 1. Доступність (A11y)
- Використання ARIA атрибутів (`role`, `aria-selected`, `aria-controls`)
- Підтримка клавіатурної навігації
- Правильний фокус та outline

### 2. Анімації
- Плавні переходи між станами (0.3s ease)
- Анімація появи контенту (opacity + transform)
- Індикатор активного табу з transition

### 3. Адаптивність
- Горизонтальне розташування на десктопі
- Вертикальне розташування на мобільних
- Різні стилі індикатора для різних розмірів

### 4. Продуктивність
- Використання CSS transitions замість JavaScript анімацій
- Мінімальна кількість DOM маніпуляцій
- Оптимізовані селектори

## 🔧 Інтеграція з проектом

### 1. Додати до HTML
```html
<!-- Замінити поточну навігацію в header.html -->
<nav class="tab-navigation" role="tablist" aria-label="Основна навігація">
  <!-- Таби -->
</nav>

<!-- Обгорнути існуючі секції в tab-content -->
<div class="tab-content">
  <!-- Існуючі секції з додаванням класів tab-panel -->
</div>
```

### 2. Додати стилі
```scss
// Додати до src/sass/blocks/_header.sass
@import 'tab-navigation'
```

### 3. Додати JavaScript
```javascript
// Додати до src/js/index.js
import TabManager from './modules/tab-manager.js';
```

## 📱 Мобільна версія

### Особливості
- Вертикальне розташування табів
- Індикатор зліва замість знизу
- Повноширинні кнопки
- Збільшений touch target (44px)

### Адаптивні breakpoints
- Десктоп: 769px+
- Планшет: 481px-768px  
- Мобільний: до 480px

## 🧪 Тестування

### Функціональність
- ✅ Переключення між табами
- ✅ Клавіатурна навігація
- ✅ Плавні анімації
- ✅ Адаптивність

### Доступність
- ✅ ARIA атрибути
- ✅ Screen reader підтримка
- ✅ Клавіатурна навігація
- ✅ Правильний фокус

### Продуктивність
- ✅ Швидкі переходи
- ✅ Мінімальні reflows
- ✅ Оптимізований CSS

---

*Конструкція створена з урахуванням сучасних стандартів веб-розробки та доступності* 