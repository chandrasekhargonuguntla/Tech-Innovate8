document.addEventListener('DOMContentLoaded', function() {
    const daysContainer = document.getElementById('days');
    const monthYearDisplay = document.getElementById('monthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const eventForm = document.getElementById('eventForm');
    const eventTitleInput = document.getElementById('eventTitle');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let events = {};

    function renderCalendar() {
        daysContainer.innerHTML = '';
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        monthYearDisplay.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            daysContainer.appendChild(emptyDiv);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;

            const dateKey = `${currentYear}-${currentMonth + 1}-${i}`;
            if (events[dateKey]) {
                const eventList = document.createElement('ul');
                events[dateKey].forEach(event => {
                    const eventItem = document.createElement('li');
                    eventItem.textContent = event;
                    eventList.appendChild(eventItem);
                });
                dayDiv.appendChild(eventList);
            }

            dayDiv.addEventListener('click', () => showEventForm(i));
            daysContainer.appendChild(dayDiv);
        }
    }

    function showEventForm(day) {
        eventForm.classList.remove('hidden');
        eventForm.onsubmit = function(e) {
            e.preventDefault();
            addEvent(day);
        };
    }

    function addEvent(day) {
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        if (!events[dateKey]) {
            events[dateKey] = [];
        }
        events[dateKey].push(eventTitleInput.value);
        renderCalendar(); // Re-render to show updated events
        eventTitleInput.value = '';
        eventForm.classList.add('hidden');
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
});
