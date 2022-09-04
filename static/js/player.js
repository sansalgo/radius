
// user has a subscription paln and then show the video
if (document.body.contains(document.querySelector('video')) === true){
  const manifestUri =

      'https://radiusstorage.blob.core.windows.net/movie/SMNWH/h264_master.m3u8';

  async function init() {

    // When using the UI, the player is made automatically by the UI object.

    const video = document.getElementById('video');

    const ui = video['ui'];
    const config = {
        controlPanelElements: ['play_pause', 'time_and_duration', 'spacer', 'mute', 'volume', 'overflow_menu', 'fullscreen'],
        overflowMenuButtons: ['captions', 'playback_rate', 'language', 'quality'],
        playbackRates: [0.25, 0.50, 0.75, 1, 1.25, 1.50, 1.75],
        addSeekBar: true,
        seekBarColors: {
            base: 'rgb(11, 12, 16)',
            buffered: 'rgb(133, 193, 189)',
            played: 'rgb(69, 162, 158)'
        },
        volumeBarColors: {
          base: 'rgb(11, 12, 16)',
          level: 'rgb(69, 162, 158)'
        },
        addBigPlayButton: true,
        clearBufferOnQualityChange: true
        
    };
    ui.configure(config);


    const controls = ui.getControls();

    const player = controls.getPlayer();

    
    if (AdorNoAd === 'Ad'){
      console.log('plan type checking')

      const adManager = player.getAdManager();

      const container = video.ui.getControls().getClientSideAdContainer();

      adManager.initClientSide(container, video);

      const adsRequest = new google.ima.AdsRequest();
      // Your ad tag url should go here. We are using a sample ad tag from the
      // IMA HTML5 SDK implementation guide for this tutorial.
      adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=';


      video.addEventListener('play',() => {
        adManager.requestClientSideAds(adsRequest);
      })

    }
    
    // Attach player and ui to the window to make it easy to access in the JS console.

    window.player = player;

    window.ui = ui;

    // Listen for error events.

    player.addEventListener('error', onPlayerErrorEvent);

    controls.addEventListener('error', onUIErrorEvent);

    // Try to load a manifest.

    // This is an asynchronous process.

    try {

      await player.load(manifestUri);

      // This runs if the asynchronous load is successful.

      console.log('The video has now been loaded!');

      

    } catch (error) {

      onPlayerError(error);

    }
    
    $('.shaka-controls-container').append("<div class = 'title-and-tag'><h1>" + title + "</h1><p>" + tagline + "</p></div>");
    $('.shaka-spinner-svg').remove();
    $('.shaka-spinner').append('<lottie-player class="lottie" autoplay loop mode="normal"></lottie-player>');
    $('.lottie').attr('src',"/static/img/loading.json")

  }

  function onPlayerErrorEvent(errorEvent) {

    // Extract the shaka.util.Error object from the event.

    onPlayerError(event.detail);

  }

  function onPlayerError(error) {

    // Handle player error

    console.error('Error code', error.code, 'object', error);

  }

  function onUIErrorEvent(errorEvent) {

    // Extract the shaka.util.Error object from the event.

    onPlayerError(event.detail);

  }

  function initFailed(errorEvent) {

    // Handle the failure to load; errorEvent.detail.reasonCode has a

    // shaka.ui.FailReasonCode describing why.

    console.error('Unable to load the UI library!');

  }

  // Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.

  document.addEventListener('shaka-ui-loaded', init);

  // Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails

  // to load (e.g. due to lack of browser support).

  document.addEventListener('shaka-ui-load-failed', initFailed);

}



// share function
let shareButton = document.querySelector('.p-and-button .button .share')
let share = document.getElementById('share')
let spanText = document.querySelector('#share .link p span')

let pageURL = window.location.href


shareButton.addEventListener('click', () => {
  share.style.display = 'flex'
})

spanText.addEventListener('click', async () => {
  await navigator.clipboard.writeText(pageURL);
})


// rating function
let starButton = document.querySelector('.star-button')
let starRatingCover = document.querySelector('.star-rating-cover')

starButton.addEventListener('click', () => {
  starRatingCover.style.display = 'flex'
})

window.onclick = function(event) {
  if (event.target == share){
    share.style.display = 'none';
  }
  else if (event.target == starRatingCover){
    starRatingCover.style.display = 'none';
  }
}


let ratingForm = document.querySelector('.ratingForm')
ratingForm .addEventListener('submit', function(e){
  e.preventDefault();
  let rate = 0
  if (document.querySelector('input[name="rate"]:checked'))
    rate = Number(document.querySelector('input[name="rate"]:checked').value);
  
  const params = {
      whatType : document.getElementById('whatType').value,
      posterId : document.getElementById('posterId').value,
      rate : rate
  };

  userRating(params)

  starRatingCover.click()

});

// send user ratings to the server side
function userRating({ whatType, posterId, rate }){
  return (
      fetch('/user-rating/', {
       method: 'POST',
       headers: {
         'Content-type': 'application/json',
         'X-CSRFToken':'{{ csrf_token }}',
       },
       credentials: 'same-origin',
       body: JSON.stringify({
          whatType: whatType,
          posterId: posterId,
          rate: rate
        }),
     })
     .then((response) => {
       return response.json();
     })
  )
}

// watchlist function
let watchlistForm = document.getElementById('watchlistForm');
watchlistForm .addEventListener('submit', function(e){
    e.preventDefault();
    const params = {
        whatType : document.getElementById('whatType').value,
        posterId : document.getElementById('posterId').value,
    };
    let watchlistFormButton = document.querySelector('#watchlistForm button')
    // watchlistFormButton.innerHTML = 'Wait';
    watchlistFormButton.disabled = true;
    watchlistFormButton.style.opacity = 0.5;
    
    watchlist(params)
  
})

// send user watchlist to the server side
function watchlist({ whatType, posterId }){
    return (
        fetch('/watchlist/', {
         method: 'POST',
         headers: {
           'Content-type': 'application/json',
           'X-CSRFToken':'{{ csrf_token }}',
         },
         credentials: 'same-origin',
         body: JSON.stringify({
            whatType: whatType,
            posterId: posterId,
          }),
       })
       .then((response) => {
         return response.json();
       })
      .then((result) => {
 
           let watchlistFormButton = document.querySelector('#watchlistForm button')

           if (watchlistFormButton.innerHTML === "Add to Watchlist"){
              watchlistFormButton.innerHTML = "Your Watchlist";
              watchlistFormButton.disabled = false;
              watchlistFormButton.style.opacity = 1;
           } else if (watchlistFormButton.innerHTML === "Your Watchlist") {
              watchlistFormButton.innerHTML = "Add to Watchlist";
              watchlistFormButton.disabled = false;
              watchlistFormButton.style.opacity = 1;
           }
       })
    )
}

// history function
if (document.body.contains(document.querySelector('video')) === true){
  document.querySelector('video').addEventListener('playing', () => {
    const params = {
      whatType : document.getElementById('whatType').value,
      posterId : document.getElementById('posterId').value,
    };

    addHistory(params)
  })
}

// send user history to the server side
function addHistory({ whatType, posterId }){
  return (
    fetch('/add-history/', {
     method: 'POST',
     headers: {
       'Content-type': 'application/json',
       'X-CSRFToken':'{{ csrf_token }}',
     },
     credentials: 'same-origin',
     body: JSON.stringify({
        whatType: whatType,
        posterId: posterId,
      }),
   })
   .then((response) => {
     return response.json();
   })
   .then((result) => {
    if (result.error) {
      console.log("Error while trying to add history.");
      throw result;
    }
    return result;
  })

)
}


