// front loader for web page
let preloader = document.getElementById('preloader')
if (document.body.contains(preloader)){
    window.onload = function() {
        document.getElementById('preloader').style.display = 'none'
    }
}

// click the profile icon to add profile checked to session storage
let profile_icon = document.querySelector('.profile-icon a')
if (document.body.contains(profile_icon)){
    profile_icon.addEventListener('click', () => {
        sessionStorage.setItem('data', JSON.stringify({'profile':'checked'}))
    })
}

// click the watchlist menu to add watchlist checked to session storage
let watchlist_checked = document.querySelector('.map .my-account .watchlist-checked')
if (document.body.contains(watchlist_checked)){
    watchlist_checked.addEventListener('click', () => {
        sessionStorage.setItem('data', JSON.stringify({'watchlist':'checked'}))
    })
}

// click the settings menu to add settings checked to session storage
let settings_checked = document.querySelector('.map .my-account .settings-checked')
if (document.body.contains(settings_checked)){
    settings_checked.addEventListener('click', () => {
        sessionStorage.setItem('data', JSON.stringify({'settings':'checked'}))
    })
}

