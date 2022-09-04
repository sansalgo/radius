// for pagination
let searchForm = document.getElementById('searchForm')
let pageLinks = document.getElementsByClassName('page-link')

let filterForm = document.querySelector('.filter')

// for search results
if(searchForm){
    for(let i = 0;pageLinks.length > i; i++){
        pageLinks[i].addEventListener('click', function (e) {
            e.preventDefault()

            let page = this.dataset.page

            searchForm.innerHTML += `<input value=${page} name="page" hidden />`

            searchForm.submit()
        })
    }
}

// for filter results
if(filterForm){
    for(let i = 0;pageLinks.length > i; i++){
        pageLinks[i].addEventListener('click', function (e) {
            e.preventDefault()

            let page = this.dataset.page

            filterForm.innerHTML += `<input value=${page} name="page" hidden />`

            filterForm.submit()
        })
    }

}