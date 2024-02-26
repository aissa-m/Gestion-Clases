const URL = '../../backEnd/php/';
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        headerToolbar: false,
        // Resto de la configuración...
    });

    calendar.render();

    // Evento para el botón "Anterior"
    document.getElementById('btnPrev').addEventListener('click', function() {
        calendar.prev();
    });

    // Evento para el botón "Hoy"
    document.getElementById('btnToday').addEventListener('click', function() {
        calendar.today();
    });

    // Evento para el botón "Siguiente"
    document.getElementById('btnNext').addEventListener('click', function() {
        calendar.next();
    });

    // Eventos para cambiar vistas...
    document.getElementById('btnMonth').addEventListener('click', function() {
        calendar.changeView('dayGridMonth');
    });

    document.getElementById('btnWeek').addEventListener('click', function() {
        calendar.changeView('timeGridWeek');
    });

    document.getElementById('btnDay').addEventListener('click', function() {
        calendar.changeView('timeGridDay');
    });
});
