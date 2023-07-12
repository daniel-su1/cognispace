if(document.cookie.includes('darkmode=true')){
    document.documentElement.setAttribute('data-bs-theme','dark')
}
else{
    document.documentElement.setAttribute('data-bs-theme','light')
}

document.getElementById('btnSwitch').addEventListener('click',()=>{
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
        document.cookie = "darkmode=false;path=/"
        console.log(document.cookie)
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
        document.cookie = "darkmode=true;path=/"
    }
})