function onload() {
    const user = JSON.parse(localStorage.getItem('RegNo'));    
    const homeLink = document.getElementById("homeLink");   
    const examLink = document.getElementById("ExamLink");
    const profileLink = document.getElementById("profileLink");
    const loginLink = document.getElementById("loginLink");
     const logoutLink = document.getElementById("logoutLink");
    if (user) {
        console.log("User:", user);
        homeLink.style.display = "block";
        examLink.style.display = "block";
        profileLink.style.display = "block";             
        loginLink.style.display = "none";
         logoutLink.style.display = "block";   

    } else {
        console.log("No user found in localStorage.");
        homeLink.style.display = "none";
        examLink.style.display = "none";
        profileLink.style.display = "none";             
        loginLink.style.display = "block";
         logoutLink.style.display = "none";   
    }                   
    
}   
window.onload = onload();
logoutLink.addEventListener("click", function() {
    localStorage.removeItem("RegNo");
    console.log("User logged out. RegNo removed from localStorage.");
    window.location.href = "./login.html";
});