function tabSectionToggle(selector, containers, nav) {
    $(selector + ' #tab1').addClass('tab__container--active');
    $(nav + ' li:first-child').addClass('tab--active');
    $(nav + ' li').click(function (e) {
        e.preventDefault();
        $(nav + ' li').removeClass('tab--active');
        $(this).addClass('tab--active');
        $(containers).removeClass('tab__container--active');
        var tabSelector = $(this).children('a');
        var $href = $(tabSelector).attr('href');
        $($href).addClass('tab__container--active');

        var jsonfileName = $href + '.json';
        jsonfileName = jsonfileName.replace('#', '');
        var jsonFilesPath = '../assets/ajax/';
        var composedPath = jsonFilesPath + jsonfileName;
        $.ajax({
            url: composedPath,
            dataType: "json",
            type: "GET",
            beforeSend: function () {
                $('#loader').addClass('active');
            },
            success: function (result) {
                setTimeout(
                    function () {
                        $('#loader').removeClass('active');
                        $.each(result, function (key, value) {
                            $($href).text(value.content);
                        });
                    }, 300);
            },
            error: function (error) {
                $('#loader').removeClass('active');
            }
        });
    });
}

function loadTabs() {

    //Fill Tab 1 and relative nav pill
    $.ajax({
        url: '../assets/ajax/tab1.json',
        dataType: "json",
        type: "GET",
        beforeSend: function () {
            $('#loader').addClass('active');
        },
        success: function (result) {
            setTimeout(
                function () {
                    $('#loader').removeClass('active');
                    $.each(result, function (key, value) {
                        $(".tab__menu--item:first-child > a").text(value.title);
                        $(".tab__container:first-child").text(value.content);
                    });
                }, 300);
        },
        error: function (error) {
            $('#loader').removeClass('active');
        }
    });

    //Fill Tab 2 and relative nav pill
    $.ajax({
        url: '../assets/ajax/tab2.json',
        dataType: "json",
        type: "GET",
        beforeSend: function () {
            $('#loader').addClass('active');
        },
        success: function (result) {
            setTimeout(
                function () {
                    $('#loader').removeClass('active');
                    $.each(result, function (key, value) {
                        $(".tab__menu--item:nth-child(2) > a").text(value.title);
                        $(".tab__container:nth-child(2)").text(value.content);
                    });
                }, 300);
        },
        error: function (error) {
            $('#loader').removeClass('active');
        }
    });

    //Fill Tab 3 and relative nav pill
    $.ajax({
        url: '../assets/ajax/tab3.json',
        dataType: "json",
        type: "GET",
        beforeSend: function () {
            $('#loader').addClass('active');
        },
        success: function (result) {
            setTimeout(
                function () {
                    $('#loader').removeClass('active');
                    $.each(result, function (key, value) {
                        $(".tab__menu--item:last-child > a").text(value.title);
                        $(".tab__container:last-child").text(value.content);
                    });
                }, 300);
        },
        error: function (error) {
            $('#loader').removeClass('active');
        }
    });
}

$(document).ready(function () {
    tabSectionToggle('#tab-section', '.tab__container', '#nav-tabs');
    loadTabs();
});