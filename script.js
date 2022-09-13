$(document).ready(function() {

    var start = false;

    var options = {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };


    function addZero(value) {
        if (parseInt(value) < 10) value = `0${value}`;
        return value;
    }

    function calculate() {
        let now = new Date();
        // console.log(`Сегодня:   ${now.toLocaleString("ru", options)}`);
        let then = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
        // console.log(`Новый год: ${then.toLocaleString("ru", options)}`);
        let diff = (then - now) / 1000;
        var day, hour, minute, second;
        day = Math.round(diff / 60 / 60 / 24);
        hour = Math.round(diff / 60 / 60 % 24);
        minute = Math.round(diff / 60 % 60);
        second = Math.round(diff % 60);
        return {
            days: day,
            hours: hour,
            minutes: minute,
            seconds: second
        }
    }

    function updateValues() {
        day = parseInt($("#days").text())
        hour = parseInt($("#hours").text())
        minute = parseInt($("#minutes").text())
        second = parseInt($("#seconds").text())

        second -= 1;
        if (second == -1) {
            second = 59;
            minute -= 1;
        }
        if (minute == -1) {
            minute = 59;
            hour -= 1;
        }
        if (hour == -1) {
            day -= 1;
            hour = 23;
        }

        $("#days").text(addZero(day));
        $("#hours").text(addZero(hour));
        $("#minutes").text(addZero(minute));
        $("#seconds").text(addZero(second));

    }

    $("#calculate").on("click", function() {

        if (!start) {
            let result = calculate();
            $("#days").text(result.days);
            $("#hours").text(result.hours);
            $("#minutes").text(result.minutes);
            $("#seconds").text(result.seconds);
            console.log(`До нового года: ${result.days} дней ${result.hours} часов ${result.minutes} минут ${result.seconds} секунд`);
            start = true;
            setInterval(updateValues, 1000);
        }
    });

});