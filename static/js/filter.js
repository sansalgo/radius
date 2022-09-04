// clear and apply function for filter
let filterForm = document.querySelector('.filter')
let clearButton = document.querySelector('.clear-and-apply .clear')
let applyButton = document.querySelector('.clear-and-apply .apply')

clearButton.addEventListener('click', () => {
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterForm.reset();
        let checkedInputs = document.querySelectorAll('.filter input')
        for (var i = 0; i<checkedInputs.length; i++){
            if (checkedInputs[i].checked){
                checkedInputs[i].removeAttribute('checked')
            }
        }
    })
})

applyButton.addEventListener('click', () => {
    filterForm.submit()
})