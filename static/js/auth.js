// disply login errors
function loginErrors(){
  let username_arrow = document.querySelector('.auth-1 .username .arrow')
  let password1_arrow = document.querySelector('.auth-1 .password1 .arrow')
  let username_message = document.querySelector('.auth-1 .username .message')
  let password1_message = document.querySelector('.auth-1 .password1 .message')

  username_arrow.style.display = 'block';
  username_arrow.style.top = '55px';
  username_arrow.style.removeProperty('bottom');
  username_arrow.style.left = '530px';
  username_arrow.style.transform = 'rotate(27deg)';
  password1_arrow.style.display = 'block';
  password1_arrow.style.bottom = '45px';
  password1_arrow.style.removeProperty('top');
  password1_arrow.style.left = '535px';
  password1_arrow.style.removeProperty('right');
  password1_arrow.style.transform = 'rotate(331deg)';
  username_message.innerHTML = 'The username or password is incorrect';
  username_message.style.width = '500px'
  username_message.style.top = '80px'
  username_message.style.removeProperty('bottom');
  username_message.style.left = '685px'
  username_message.style.display ='block';
}

// check the login input fields
function checkInputs(){
  var error = true
  const form = document.querySelector('form[name="login"]')
  const username = document.querySelector('form[name="login"] input[name="username"]')
  const password = document.querySelector('form[name="login"] input[name="password1"]')  
  let username_arrow = document.querySelector('.auth-1 .username .arrow')
  let password1_arrow = document.querySelector('.auth-1 .password1 .arrow')
  let username_message = document.querySelector('.auth-1 .username .message')
  let password1_message = document.querySelector('.auth-1 .password1 .message')

  if (username.value.trim() === ''){
    username_arrow.style.display = 'block';
    username_arrow.style.bottom = '55px';
    username_arrow.style.left = '540px';
    username_message.innerHTML = 'Username cannot be empty';
    username_message.style.width = '500px'
    username_message.style.left = '695px'
    username_message.style.bottom = '80px'
    username_message.style.display ='block';
    return false;
  } else {
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (password.value.trim() === ''){
    password1_arrow.style.display = 'block';
    password1_arrow.style.top = '60px';
    password1_arrow.style.right = '540px';
    password1_message.innerHTML = 'Password cannot be empty';
    password1_message.style.width = '500px'
    password1_message.style.top = '80px'
    password1_message.style.right = '540px'
    password1_message.style.display ='block';
    return false;
    } else {
      password1_arrow.style.display = 'none';
      password1_message.style.display ='none';
    }
    return true;
}

// check the registration input fields
function checkRegister(){
  const username = document.querySelector('form[name="register"] input[name="username"]')
  const email = document.querySelector('form[name="register"] input[name="email"]')
  const password1 = document.querySelector('form[name="register"] input[name="password1"]')
  const password2 = document.querySelector('form[name="register"] input[name="password2"]')
  const checkbox = document.querySelector('form[name="register"] input[name="p-and-t"]')
  let username_arrow = document.querySelector('.auth-2 .username .arrow')
  let email_arrow = document.querySelector('.auth-2 .email .arrow')
  let password1_arrow = document.querySelector('.auth-2 .password1 .arrow')
  let password2_arrow = document.querySelector('.auth-2 .password2 .arrow')
  let checkbox_arrow = document.querySelector('.auth-2 .checkbox .arrow')
  let username_message = document.querySelector('.auth-2 .username .message')
  let email_message = document.querySelector('.auth-2 .email .message')
  let password1_message = document.querySelector('.auth-2 .password1 .message')
  let password2_message = document.querySelector('.auth-2 .password2 .message')
  let checkbox_message = document.querySelector('.auth-2 .checkbox .message')

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
  }

  if (isRequired(username.value.trim())) {
    username_arrow.style.display = 'block';
    username_arrow.style.left = '535px';
    username_arrow.style.bottom = '60px';
    username_message.innerHTML = 'Username cannot be empty';
    username_message.style.bottom = '85px'
    username_message.style.left = '690px'
    username_message.style.width = '500px'
    username_message.style.display ='block';
    return false;  
  } else {
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (isBetween(username.value.trim().length, 3, 13)){
    username_arrow.style.display = 'block';
    username_arrow.style.left = '535px';
    username_arrow.style.bottom = '60px';
    username_message.innerHTML = 'Username must be between 3 and 13 characters';
    username_message.style.bottom = '48px'
    username_message.style.left = '690px'
    username_message.style.width = '500px'
    username_message.style.display ='block';
    return false;
  } else {
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (isSpecialChar(username.value.trim())){
    username_arrow.style.display = 'block';
    username_arrow.style.left = '535px';
    username_arrow.style.bottom = '60px';
    username_message.innerHTML = 'Only lowercase alphanumeric characters allowed';
    username_message.style.bottom = '48px'
    username_message.style.left = '690px'
    username_message.style.width = '500px'
    username_message.style.display ='block';
    return false;
  } else {
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (/\s/.test(username.value.trim())){
    username_arrow.style.display = 'block';
    username_arrow.style.left = '535px';
    username_arrow.style.bottom = '60px';
    username_message.innerHTML = 'Whitespace is not allowed';
    username_message.style.bottom = '85px'
    username_message.style.left = '690px'
    username_message.style.width = '500px'
    username_message.style.display ='block';
    return false;
  } else {
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (!/^[a-z]/i.test(username.value.trim())){
    username_arrow.style.display = 'block';
    username_arrow.style.left = '535px';
    username_arrow.style.bottom = '60px';
    username_message.innerHTML = 'Username must start with at least one lowercase character';
    username_message.style.bottom = '48px'
    username_message.style.left = '690px'
    username_message.style.width = '500px'
    username_message.style.display ='block';
    return false;
  } else { 
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (username.value !== username.value.toLowerCase()){
    username_arrow.style.display = 'block';
    username_arrow.style.left = '535px';
    username_arrow.style.bottom = '60px';
    username_message.innerHTML = 'Only lowercase alphanumeric characters allowed';
    username_message.style.bottom = '48px'
    username_message.style.left = '690px'
    username_message.style.width = '500px'
    username_message.style.display ='block';
    return false;
  } else {
    username_arrow.style.display = 'none';
    username_message.style.display ='none';
  }
  if (isRequired(email.value.trim())) {
    email_arrow.style.display = 'block';
    email_arrow.style.top = '60px';
    email_arrow.style.right = '535px';
    email_message.innerHTML = 'Email cannot be empty';
    email_message.style.width = '500px';
    email_message.style.top = '85px';
    email_message.style.right = '485px';
    email_message.style.display ='block';
    return false;
  } else {
    email_arrow.style.display = 'none';
    email_message.style.display ='none';
  }
  if (!isEmail(email.value.trim())){
    email_arrow.style.display = 'block';
    email_message.innerHTML = 'Email is not valid';
    email_message.style.top = '85px';
    email_message.style.right = '405px';
    email_message.style.display ='block';
    return false
  } else {
    email_arrow.style.display = 'none';
    email_message.style.display ='none';
  }
  if (isRequired(password1.value.trim())){
    password1_arrow.style.display = 'block';
    password1_arrow.style.top = '50px';
    password1_arrow.style.left = '542px';
    password1_message.innerHTML = 'Password cannot be empty';
    password1_message.style.width = '500px'
    password1_message.style.top = '82px'
    password1_message.style.left = '700px'
    password1_message.style.display ='block';
    return false;
  } else {
    password1_arrow.style.display = 'none';
    password1_message.style.display ='none';
  }
  if (!isPassword(password1.value.trim())){
    password1_arrow.style.display = 'block';
    password1_arrow.style.top = '50px';
    password1_arrow.style.left = '542px';
    password1_message.innerHTML = 'Passwords must contain at least eight characters, including:<br>\
    - at least one lowercase character<br>- at least one uppercase character<br>- at least one number<br>- at least one special character';
    password1_message.style.width = '500px'
    password1_message.style.top = '82px'
    password1_message.style.left = '700px'
    password1_message.style.display ='block';
    return false;
  } else {
    password1_arrow.style.display = 'none';
    password1_message.style.display ='none';
    document.querySelector('.auth-2 .password1').style.display = 'none'
    document.querySelector('.auth-2 .password2').style.display = 'flex'
  }
  if (isRequired(password2.value.trim())){
    password2_arrow.style.display = 'block';
    password2_arrow.style.top = '50px';
    password2_arrow.style.left = '542px';
    password2_message.innerHTML = 'Confirm password cannot be empty';
    password2_message.style.width = '500px'
    password2_message.style.top = '82px'
    password2_message.style.left = '700px'
    password2_message.style.display ='block';
    return false;
  } else {
    password2_arrow.style.display = 'none';
    password2_message.style.display ='none';
  }
  if (password1.value.trim() !== password2.value.trim()){
    password2_arrow.style.display = 'block';
    password2_arrow.style.top = '50px';
    password2_arrow.style.left = '542px';
    password2_message.innerHTML = 'Confirm password does not match';
    password2_message.style.width = '500px'
    password2_message.style.top = '82px'
    password2_message.style.left = '700px'
    password2_message.style.display ='block';
    return false;
  } else{
    password2_arrow.style.display = 'none';
    password2_message.style.display ='none';
  }
  if (!checkbox.checked){
    checkbox_arrow.style.display = 'block';
    checkbox_message.innerHTML = 'Privacy and terms must be agreed';
    checkbox_message.style.width = '500px'
    checkbox_message.style.top = '60px'
    checkbox_message.style.right = '635px'
    checkbox_message.style.display ='block';
    return false;
  } else {
    checkbox_arrow.style.display = 'none';
    checkbox_message.style.display ='none';
  }
  return true;
                  
}

// for toogle switches and confirm password
// auth-1 == login | (toogle0)
// auth-2 == register | (toogle1) and another for confirm password (toogle2)
// auth-5 == reset password | (toogle3) and another for confirm password (toogle4)
// right_back and left_back are arrows that go between password and confirm password
// password0-7 are password fields
const toogle0 = document.querySelector('.auth-1 .password1 .toggle');
const toogle1 = document.querySelector('.auth-2 .password1 .toggle');
const toogle2 = document.querySelector('.auth-2 .password2 .toggle');
const toogle3 = document.querySelector('.auth-5 .password1 .toggle');
const toogle4 = document.querySelector('.auth-5 .password2 .toggle');
const toogle5 = document.querySelector('.change-password .password0 .toggle');
const toogle6 = document.querySelector('.change-password .password1 .toggle');
const toogle7 = document.querySelector('.change-password .password2 .toggle');
const right_back = document.querySelector('.auth-2 .password1 .right-back')
const left_back = document.querySelector('.auth-2 .password2 .left-back')
const password0 = document.querySelector('form[name="login"] input[name="password1"]');
const password1 = document.querySelector('form[name="register"] input[name="password1"]');
const password2 = document.querySelector('form[name="register"] input[name="password2"]');
const password3 = document.querySelector('form[name="resetpassword"] input[name="new_password1"]');
const password4 = document.querySelector('form[name="resetpassword"] input[name="new_password2"]');
const password5 = document.querySelector('form[name="passwordChangeForm"] input[name="old_password"]');
const password6 = document.querySelector('form[name="passwordChangeForm"] input[name="new_password1"]');
const password7 = document.querySelector('form[name="passwordChangeForm"] input[name="new_password2"]');
 

if (document.body.contains(toogle0)){
  toogle0.addEventListener('click', () => {
    const type = password0.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password0.getAttribute('type') === 'password'){
      document.querySelector('.auth-1 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.auth-1 .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-1 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-1 .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-1 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.auth-1 .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.auth-1 .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-1 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-1 .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-1 .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password0.setAttribute('type', type);
  });
}


if (document.body.contains(toogle1)){
  toogle1.addEventListener('click', () => {
    const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password1.getAttribute('type') === 'password'){
      document.querySelector('.auth-2 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.auth-2 .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-2 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-2 .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-2 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.auth-2 .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.auth-2 .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-2 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-2 .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-2 .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password1.setAttribute('type', type);
  });
}


if (document.body.contains(toogle2)){
  toogle2.addEventListener('click', () => {
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password2.getAttribute('type') === 'password'){
      document.querySelector('.auth-2 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.auth-2 .password2 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-2 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-2 .password2 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-2 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.auth-2 .password2 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.auth-2 .password2 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-2 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-2 .password2 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-2 .password2 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password2.setAttribute('type', type);
  });
}


if (document.body.contains(toogle3)){
  toogle3.addEventListener('click', () => {
    const type = password3.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password3.getAttribute('type') === 'password'){
      document.querySelector('.auth-5 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.auth-5 .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-5 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-5 .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-5 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.auth-5 .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.auth-5 .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-5 .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-5 .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-5 .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password3.setAttribute('type', type);
  });
}


if (document.body.contains(toogle4)){
  toogle4.addEventListener('click', () => {
    const type = password4.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password4.getAttribute('type') === 'password'){
      document.querySelector('.auth-5 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.auth-5 .password2 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-5 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-5 .password2 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-5 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.auth-5 .password2 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.auth-5 .password2 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.auth-5 .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.auth-5 .password2 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.auth-5 .password2 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password4.setAttribute('type', type);
  });
}


if (document.body.contains(toogle5)){
  toogle5.addEventListener('click', () => {
    const type = password5.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password5.getAttribute('type') === 'password'){
      document.querySelector('.change-password .password0 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.change-password .password0 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.change-password .password0 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.change-password .password0 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.change-password .password0 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.change-password .password0 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.change-password .password0 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.change-password .password0 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.change-password .password0 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.change-password .password0 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password5.setAttribute('type', type);
  });
}


if (document.body.contains(toogle6)){
  toogle6.addEventListener('click', () => {
    const type = password6.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password6.getAttribute('type') === 'password'){
      document.querySelector('.change-password .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.change-password .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.change-password .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.change-password .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.change-password .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.change-password .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.change-password .password1 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.change-password .password1 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.change-password .password1 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.change-password .password1 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password6.setAttribute('type', type);
  });
}


if (document.body.contains(toogle7)){
  toogle7.addEventListener('click', () => {
    const type = password7.getAttribute('type') === 'password' ? 'text' : 'password';
    if (password7.getAttribute('type') === 'password'){
      document.querySelector('.change-password .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      document.querySelector('.change-password .password2 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.change-password .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.change-password .password2 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.change-password .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
    } else {
      document.querySelector('.change-password .password2 .toggle svg #toggle').style.stroke = '#45A29E'
      document.querySelector('.change-password .password2 .toggle svg').addEventListener('mouseover', () => {
        document.querySelector('.change-password .password2 .toggle svg #toggle').style.stroke = '#69FCF2'
      })
      document.querySelector('.change-password .password2 .toggle svg').addEventListener('mouseleave', () => {
        document.querySelector('.change-password .password2 .toggle svg #toggle').style.stroke = '#45A29E'
      })
    };
    password7.setAttribute('type', type);
  });
}



if (document.body.contains(right_back)){
  right_back.addEventListener('click', () => {
    document.querySelector('.auth-2 .password1').style.display = 'none'
    document.querySelector('.auth-2 .password2').style.display = 'flex'
  });
}


if (document.body.contains(left_back)){
  left_back.addEventListener('click', () => {
    document.querySelector('.auth-2 .password1').style.display = 'flex'
    document.querySelector('.auth-2 .password2').style.display = 'none'
  });
}

// to display register username errors
function registerUsernameErrors(){
  let username_arrow = document.querySelector('.auth-2 .username .arrow')
  let username_message = document.querySelector('.auth-2 .username .message')

  username_arrow.style.display = 'block';
  username_arrow.style.left = '535px';
  username_arrow.style.bottom = '60px';
  username_message.innerHTML = 'This username is already taken';
  username_message.style.bottom = '85px'
  username_message.style.left = '690px'
  username_message.style.width = '500px'
  username_message.style.display ='block';
}

// to display register email errors
function registerEmailErrors(){
  let email_arrow = document.querySelector('.auth-2 .email .arrow')
  let email_message = document.querySelector('.auth-2 .email .message')

  email_arrow.style.display = 'block';
  email_arrow.style.top = '60px';
  email_arrow.style.right = '535px';
  email_message.innerHTML = 'This email address is already exists';
  email_message.style.width = '500px';
  email_message.style.top = '85px';
  email_message.style.right = '635px';
  email_message.style.display ='block';
}

// check reset email validation 
function resetEmailCheck(){
  const email = document.querySelector('form[name="resetemail"] input[name="email"]')
  let email_arrow = document.querySelector('.auth-3 .email .arrow')
  let email_message = document.querySelector('.auth-3 .email .message')

  const isRequired = input => input === '' ? true : false;
  const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);};

  if (isRequired(email.value.trim())) {
    email_arrow.style.display = 'block';
    email_arrow.style.bottom = '65px';
    email_arrow.style.left = '540px';
    email_message.innerHTML = 'Email cannot be empty';
    email_message.style.width = '500px';
    email_message.style.bottom = '90px';
    email_message.style.left = '698px';
    email_message.style.display ='block';
    return false;
  } else {
    email_arrow.style.display = 'none';
    email_message.style.display ='none';
  }
  if (!isEmail(email.value.trim())){
    email_arrow.style.display = 'block';
    email_arrow.style.bottom = '65px';
    email_arrow.style.left = '540px';
    email_message.innerHTML = 'Email is not valid';
    email_message.style.width = '500px';
    email_message.style.bottom = '90px';
    email_message.style.left = '698px';
    email_message.style.display ='block';
    return false
  } else {
    email_arrow.style.display = 'none';
    email_message.style.display ='none';
  }
  return true
}

// check reset password
function resetPasswordCheck(){
  const password1 = document.querySelector('form[name="resetpassword"] input[name="new_password1"]')
  const password2 = document.querySelector('form[name="resetpassword"] input[name="new_password2"]')
  let password1_arrow = document.querySelector('.auth-5 .password1 .arrow')
  let password2_arrow = document.querySelector('.auth-5 .password2 .arrow')
  let password1_message = document.querySelector('.auth-5 .password1 .message')
  let password2_message = document.querySelector('.auth-5 .password2 .message')

  const isRequired = input => input === '' ? true : false;
  const isPassword = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
  };

  if (isRequired(password1.value.trim())){
    password1_arrow.style.display = 'block';
    password1_arrow.style.bottom = '60px';
    password1_arrow.style.left = '535px';
    password1_message.innerHTML = 'Password cannot be empty';
    password1_message.style.width = '500px'
    password1_message.style.top = '-43px'
    password1_message.style.left = '690px'
    password1_message.style.display ='block';
    return false;
  } else {
    password1_arrow.style.display = 'none';
    password1_message.style.display ='none';
  }
  if (!isPassword(password1.value.trim())){
    password1_arrow.style.display = 'block';
    password1_arrow.style.bottom = '60px';
    password1_arrow.style.left = '535px';
    password1_message.innerHTML = 'Passwords must contain at least eight characters, including:<br>\
    - at least one lowercase character<br>- at least one uppercase character<br>- at least one number<br>- at least one special character';
    password1_message.style.width = '500px'
    password1_message.style.top = '-43px'
    password1_message.style.left = '690px'
    password1_message.style.display ='block';
    return false;
  } else {
    password1_arrow.style.display = 'none';
    password1_message.style.display ='none';
  }
  if (isRequired(password2.value.trim())){
    password2_arrow.style.display = 'block';
    password2_arrow.style.top = '60px';
    password2_arrow.style.right = '535px';
    password2_arrow.style.transform = 'rotate(160deg)';
    password2_message.innerHTML = 'Confirm password cannot be empty';
    password2_message.style.width = '500px'
    password2_message.style.top = '82px'
    password2_message.style.right = '645px'
    password2_message.style.display ='block';
    return false;
  } else {
    password2_arrow.style.display = 'none';
    password2_message.style.display ='none';
  }
  if (password1.value.trim() !== password2.value.trim()){
    password2_arrow.style.display = 'block';
    password2_arrow.style.top = '60px';
    password2_arrow.style.right = '535px';
    password2_arrow.style.transform = 'rotate(160deg)';
    password2_message.innerHTML = 'Confirm password does not match';
    password2_message.style.width = '500px'
    password2_message.style.top = '82px'
    password2_message.style.right = '630px'
    password2_message.style.display ='block';
    return false;
  } else{
    password2_arrow.style.display = 'none';
    password2_message.style.display ='none';
  }
  return true
}
