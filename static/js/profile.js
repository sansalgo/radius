// for profile menus
var labels = document.querySelectorAll('.profile-menu label');
labels[0].addEventListener('click', () => {
    document.querySelector('.history').style.display = 'block';
    document.querySelector('.watchlist').style.display = 'none';
    document.querySelector('.settings').style.display = 'none';
    document.querySelector('.video-title .title h1').innerHTML = 'Profile'
});
labels[1].addEventListener('click', () => {
    document.querySelector('.history').style.display = 'none';
    document.querySelector('.watchlist').style.display = 'block';
    document.querySelector('.settings').style.display = 'none';
    document.querySelector('.video-title .title h1').innerHTML = 'Watchlist'
});
labels[2].addEventListener('click', () => {
    document.querySelector('.history').style.display = 'none';
    document.querySelector('.watchlist').style.display = 'none';
    document.querySelector('.settings').style.display = 'block';
    document.querySelector('.video-title .title h1').innerHTML = 'Settings';
});

// used to change profile details
function profileDetails(){
    const name  = document.querySelector('.profile-details input[name="name"]');
    const username  = document.querySelector('.profile-details input[name="username"]');
    const email  = document.querySelector('.profile-details input[name="email"]');
    const error = document.querySelector('.error p')

    const isRequired = input => input === '' ? true : false;
    const isBetween = (length, min, max) => (length < min) || (length > max) ? true : false;

    const isEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const isPassword = (password) => {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return re.test(password);
    };

    const isSpecialChar = (username) => {
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(username);
    };


    if (isRequired(username.value.trim())){
        document.querySelector('.error-cover').style.display = 'flex';
        username.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'Username cannot be empty';
        return false;
    } else if (isBetween(username.value.trim().length, 3, 13)){
        document.querySelector('.error-cover').style.display = 'flex';
        username.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'Username must be between 3 and 13 characters';
        return false;
        } else if (isSpecialChar(username.value.trim())){
            document.querySelector('.error-cover').style.display = 'flex';
            username.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
            error.innerHTML = 'Only lowercase alphanumeric characters allowed';
            return false;
        } else if (/\s/.test(username.value.trim())){
            document.querySelector('.error-cover').style.display = 'flex';
            username.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
            error.innerHTML = 'Whitespace is not allowed';
            return false;
        } else if (username.value !== username.value.toLowerCase()){
            document.querySelector('.error-cover').style.display = 'flex';
            username.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
            error.innerHTML = 'Only lowercase alphanumeric characters allowed';
            return false;
            } else if (Number(username.value.trim())) {
                document.querySelector('.error-cover').style.display = 'flex';
                username.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
                error.innerHTML = 'Username must contain at least one lowercase character';
                return false;
            } else if (isRequired(email.value.trim())) {
                username.style['boxShadow'] = 'none'
                document.querySelector('.error-cover').style.display = 'flex';
                email.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
                error.innerHTML = 'Email cannot be empty';
                return false;
            } else if (!isEmail(email.value.trim())) {
                document.querySelector('.error-cover').style.display = 'flex';
                email.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
                error.innerHTML = 'Email is not valid';
                return false;
            } else {
                document.querySelector('.error-cover').style.display = 'none';
                email.style['boxShadow'] = 'none'
                return true;
            }
            
}

// used to change the password
function changePassword(){
    const old_password  = document.querySelector('.change-password input[name="old_password"]');
    const new_password1  = document.querySelector('.change-password input[name="new_password1"]');
    const new_password2  = document.querySelector('.change-password input[name="new_password2"]');
    const error = document.querySelector('.error p')

    const isRequired = input => input === '' ? true : false;

    const isPassword = (password) => {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return re.test(password);
    };

    if (isRequired(old_password.value.trim())){
        document.querySelector('.error-cover').style.display = 'flex';
        old_password.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'Old password cannot be empty';
        return false;
    } else if (isRequired(new_password1.value.trim())) {
        old_password.style['boxShadow'] = 'none'
        document.querySelector('.error-cover').style.display = 'flex';
        new_password1.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'New password cannot be empty';
        return false;
    } else if (isRequired(new_password2.value.trim())) {
        new_password1.style['boxShadow'] = 'none'
        document.querySelector('.error-cover').style.display = 'flex';
        new_password2.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'Confirm password cannot be empty';
        return false;
    } else if (!isPassword(new_password1.value.trim())) {
        new_password2.style['boxShadow'] = 'none'
        document.querySelector('.error-cover').style.display = 'flex';
        new_password1.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'Passwords must contain at least eight characters, including:<br>\
        - at least one lowercase character<br>- at least one uppercase character<br>- at least one number<br>- at least one special character';
        return false;
    } else if (new_password1.value.trim() !== new_password2.value.trim()) {
        new_password2.style['boxShadow'] = 'none';
        document.querySelector('.error-cover').style.display = 'flex';
        new_password1.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        new_password2.style['boxShadow'] = 'inset 0 0 0 4px #69FCF2'
        error.innerHTML = 'Confirm password does not match';
        return false;
    } else {
        new_password1.style['boxShadow'] = 'none'
        new_password2.style['boxShadow'] = 'none'
        document.querySelector('.error-cover').style.display = 'none';
        return true;
    }
}

// to disply username errors
function profileUsernameError(){
    document.querySelector('.error-cover').style.display = 'flex';
    document.querySelector('.error p').innerHTML = 'That username is already taken';
}

// to disply email errors
function profileEmailError(){
    document.querySelector('.error-cover').style.display = 'flex';
    document.querySelector('.error p').innerHTML = 'That email address is already exists';
}

// to disply confirm password errors
function oldPasswordError(){
    document.querySelector('.error-cover').style.display = 'flex';
    document.querySelector('.error p').innerHTML = 'That old password does not match';
}

// to add last clicked menu to session storage
// example: profile menu was clicked then add to seesion storage profile: checked
let isFirstLoad = sessionStorage.getItem('isFirstLoad');

if(!isFirstLoad){
    let profile = document.getElementById('profile')
    radioClick(profile)
    sessionStorage.setItem('isFirstLoad', 'true')
}

// function to add a menu to session storage
function radioClick(radio){
    console.log(radio)
    if (radio.id == 'profile'){
        sessionStorage.setItem('data', JSON.stringify({'profile':'checked'}))
    } else {
        sessionStorage.setItem('data', JSON.stringify({'profile':'unchecked'}))
        if (radio.id == 'watchlist') {
            sessionStorage.setItem('data', JSON.stringify({'watchlist':'checked'}))
        } else {
            sessionStorage.setItem('data', JSON.stringify({'watchlist':'unchecked'}))
            if (radio.id == 'settings') {
                sessionStorage.setItem('data', JSON.stringify({'settings':'checked'}))
            } else {
                sessionStorage.setItem('data', JSON.stringify({'settings':'unchecked'}))
            }
        }  
    }
}

// to disply relevant content in different menu
var data = sessionStorage.getItem('data')
if (JSON.parse(data).profile == 'checked'){
    document.querySelector('.history').style.display = 'block';
    document.querySelector('.video-title .title h1').innerHTML = 'Profile'
    document.getElementById('profile').checked = true
} else if (JSON.parse(data).watchlist == 'checked'){
    document.querySelector('.watchlist').style.display = 'block';
    document.querySelector('.video-title .title h1').innerHTML = 'Watchlist'
    document.getElementById('watchlist').checked = true
} else if (JSON.parse(data).settings == 'checked'){
    document.querySelector('.settings').style.display = 'block';
    document.querySelector('.video-title .title h1').innerHTML = 'Settings';
    document.getElementById('settings').checked = true
}

// for watchlist watch link
function toWatch(watchUrl){
    let url = watchUrl.id
    window.location.href = '/player/'+url
}

// to display empty area - watchlist
let cards = document.querySelector('.watchlist-card').childElementCount
if (cards === 0) document.getElementById('watchlist-empty-cover').style.display = 'flex';

// remove function for watchlist
function toRemoveWatchlist(button){
    let form = button.parentElement
    let formParent = form.parentElement
    let card = formParent.parentElement
    let watchlist_cards = card.parentElement

    if (watchlist_cards.childElementCount === 1) {
        console.log(watchlist_cards);
        document.getElementById('watchlist-empty-cover').style.display = 'flex';
    }
        
    card.remove()
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    const params = {
        posterId : form.elements['posterid'].value
    };
    removeWatchlist(params)
}

// to disply empty area - history
let history = document.querySelector('.history-table')
if (history.childElementCount === 0 ) 
    document.getElementById('history-empty-cover').style.display = 'flex';

// function for clear history
function toClearHistory(button){
    let form = button.parentElement;
    let column = form.parentElement;
    let row = column.parentElement;
    let tbody = row.parentElement;
    let table = tbody.parentElement;
    let historyTable = table.parentElement;

    row.remove();

    if (history.childElementCount === 1 ){
        if (tbody.childElementCount === 0)
            document.getElementById('history-empty-cover').style.display = 'flex';
    } 
    
    if (tbody.childElementCount === 0){
        table.remove()
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    const params = {
        posterId : form.elements['posterid'].value,
        date : form.elements['date'].value,
    };
    clearHistory(params)
}

// to send a removal request to the server side
function removeWatchlist({ posterId }){
    return (
        fetch('/watchlist/', {
         method: 'POST',
         headers: {
           'Content-type': 'application/json',
           'X-CSRFToken':'{{ csrf_token }}',
         },
         credentials: 'same-origin',
         body: JSON.stringify({
            posterId: posterId,
          }),
       })
       .then((response) => {
         return response.json();
       })
    )
}

// function that clear history by sending a request to the server side
function clearHistory({ posterId, date }){
    return (
        fetch('/clear-history/', {
         method: 'POST',
         headers: {
           'Content-type': 'application/json',
           'X-CSRFToken':'{{ csrf_token }}',
         },
         credentials: 'same-origin',
         body: JSON.stringify({
            posterId: posterId,
            date: date,
          }),
       })
       .then((response) => {
         return response.json();
       })
    )
}