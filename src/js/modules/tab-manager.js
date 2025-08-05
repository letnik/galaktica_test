// Найпростіший варіант без класів
const initTabs = () => {
  const tabs = document.querySelectorAll('.nav__link');
  const panels = document.querySelectorAll('.tab-panel');
  
  // Ініціалізація першого активного табу
  const activeTab = document.querySelector('.nav__link--active');
  if (activeTab) {
    showPanel(activeTab.getAttribute('data-target'));
  }
  
  // Додаємо обробники подій
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const clickedTab = e.currentTarget;
      const targetPanel = clickedTab.getAttribute('data-target');
      
      // Оновлюємо активний стан
      tabs.forEach(t => t.classList.remove('nav__link--active'));
      clickedTab.classList.add('nav__link--active');
      
      // Показуємо панель
      showPanel(targetPanel);
    });
  });
  
  function showPanel(panelId) {
    // Приховуємо всі панелі
    panels.forEach(panel => panel.classList.remove('tab-panel--active'));
    
    // Показуємо цільову панель
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add('tab-panel--active');
      
      // Анімація accent елементів
      setTimeout(() => {
        targetPanel.querySelectorAll('.tab-panel__title-accent').forEach(element => {
          if (!element.classList.contains('animate')) {
            element.classList.add('animate');
          }
        });
      }, 100);
    }
  }
};

export default initTabs; 