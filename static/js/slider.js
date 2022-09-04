$(document).ready(function(){
    $(".center-mode").slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        swipe: true,
        autoplay: true,
        autoplaySpeed: 3000,
        variableWidth: true,
        variableHeight: true,
        prevArrow: '#prev-arrow',
        nextArrow: '#next-arrow'
    });
    /*$(".multiple-items-7").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipe: false,
        prevArrow: '#prev-arrow-7',
        nextArrow: '#next-arrow-7'
    });*/
    var slider = {
        0:{slider:'#multiple-items-0',prev:'#prev-arrow-0',next:'#next-arrow-0'},
        1:{slider:'#multiple-items-1',prev:'#prev-arrow-1',next:'#next-arrow-1'},
        2:{slider:'#multiple-items-2',prev:'#prev-arrow-2',next:'#next-arrow-2'},
        3:{slider:'#multiple-items-3',prev:'#prev-arrow-3',next:'#next-arrow-3'},
        4:{slider:'#multiple-items-4',prev:'#prev-arrow-4',next:'#next-arrow-4'},
        5:{slider:'#multiple-items-5',prev:'#prev-arrow-5',next:'#next-arrow-5'},
        6:{slider:'#multiple-items-6',prev:'#prev-arrow-6',next:'#next-arrow-6'},
        //7:{slider:'#multiple-items-7',prev:'#prev-arrow-7',next:'#next-arrow-7'}
        
    };
    $.each(slider,function () {
        $(this.slider).slick({
            infinite: false,
            slidesToShow: 6,
            slidesToScroll: 6,
            swipe: false,
            variableWidth: true,
            variableHeight: true,
            prevArrow: this.prev,
            nextArrow: this.next
        });
    });
    $("#multiple-items-7").slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      swipe: false,
      variableWidth: true,
      variableHeight: true,
      prevArrow: '#prev-arrow-7',
      nextArrow: '#next-arrow-7'
    });
    /*
    var player = videojs('player', {
        controls: true,
        playbackRates: [1.75,1.50,1.25,1,0.25,0.50,0.75],
        aspectRatio: "1902:1080"
    });
    var track = new videojs.VideoTrack({
        id: "new-track",
        kind: "commebtry",
        label: "directort\'s comme",
        language: "en"

    });
    player.VideoTrack().addTrack(track);
    player.qualityLevels();
    */

});