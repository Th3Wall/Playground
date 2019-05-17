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
            $('#loader').removeClass('active');
            $.each(result, function (key, value) {
                $(".tab__menu--item:first-child > a").text(value.title).append('&nbsp;<i class="fas fa-chevron-up"></i>');
                $(".tab__container:first-child").text(value.content);
            });
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
            $('#loader').removeClass('active');
            $.each(result, function (key, value) {
                $(".tab__menu--item:nth-child(2) > a").text(value.title).append('&nbsp;<i class="fas fa-chevron-up"></i>');
                $(".tab__container:nth-child(2)").text(value.content);
            });
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
            $('#loader').removeClass('active');
            $.each(result, function (key, value) {
                $(".tab__menu--item:last-child > a").text(value.title).append('&nbsp;<i class="fas fa-chevron-up"></i>');
                $(".tab__container:last-child").text(value.content);
            });
        },
        error: function (error) {
            $('#loader').removeClass('active');
        }
    });
}

function validateForm() {

    $('#name_error_msg').hide();
    $('#lastname_error_msg').hide();
    $('#email_error_msg').hide();
    $('#message_error_msg').hide();

    var name_error = false;
    var lastname_error = false;
    var email_error = false;
    var message_error = false;

    $('#name').focusout(function () {
        check_name();
    });
    $('#lastname').focusout(function () {
        check_lastname();
    });
    $('#email').focusout(function () {
        check_email();
    });
    $('#message').focusout(function () {
        check_message();
    });

    function check_name() {
        var pattern = /^[a-zA-Z]*$/;
        var name = $('#name').val();
        if (pattern.test(name) && name !== '') {
            $('#name_error_msg').hide();
        } else {
            $('#name_error_msg').html("Should contain only characters");
            $('#name_error_msg').show();
            name_error = true;
        }
    }

    function check_lastname() {
        var pattern = /^[a-zA-Z]*$/;
        var lastname = $('#lastname').val();
        if (pattern.test(lastname) && lastname !== '') {
            $('#lastname_error_msg').hide();
        } else {
            $('#lastname_error_msg').html("Should contain only characters");
            $('#lastname_error_msg').show();
            lastname_error = true;
        }
    }

    function check_email() {
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $('#email').val();
        if (pattern.test(email) && email !== '') {
            $('#email_error_msg').hide();
        } else {
            $('#email_error_msg').html("Please insert a valid email");
            $('#email_error_msg').show();
            email_error = true;
        }
    }

    function check_message() {
        var message = $('#message').val();
        if (message.length > 100) {
            $('#message_error_msg').hide();
        } else {
            $('#message_error_msg').html("You should insert a message at least of 100 characters");
            $('#message_error_msg').show();
            message_error = true;
        }
    }

    $('#submitBtn').click(function (e) {
        e.preventDefault();

        name_error = false;
        lastname_error = false;
        email_error = false;
        message_error = false;

        check_name();
        check_lastname();
        check_email();
        check_message();

        if (name_error === false && lastname_error === false && email_error === false && message_error === false) {
            return true;
        } else {
            return false;
        }
    });
}

function cookieAcceptConsent() {
    $('#cookieBtn').click(function () {
        $("#cookie_consent").fadeOut("slow");
    })
}

function initOwlCarousel() {
    $('.slider-active').owlCarousel({
        loop: true,
        autoplay: true,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
}

function checkNavTransparency() {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 150) {
            $('.header__nav').addClass('header__nav--white');
            $('.whitelogo').removeClass('show');
            $('.whitelogo').addClass('hide');
            $('.blacklogo').addClass('show');
            $('.blacklogo').removeClass('hide');
        } else {
            $('.header__nav').removeClass('header__nav--white');
            $('.blacklogo').removeClass('show');
            $('.blacklogo').addClass('hide');
            $('.whitelogo').addClass('show');
            $('.whitelogo').removeClass('hide');
        }
    });
}

$(document).ready(function () {
    checkNavTransparency();
    initOwlCarousel();
    tabSectionToggle('#tab-section', '.tab__container', '#nav-tabs');
    loadTabs();
    validateForm();
    cookieAcceptConsent();

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top //no need of parseInt here
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

});