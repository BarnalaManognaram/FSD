function onload() {
    const user = localStorage.getItem('RegNo');    
    const homeLink = document.getElementById("homeLink");   
    const examLink = document.getElementById("ExamLink");
    const profileLink = document.getElementById("profileLink");
    const loginLink = document.getElementById("loginLink");
     const logoutLink = document.getElementById("logoutLink");
     const regIdElement = document.getElementById("regId");
    if (user) {
        console.log("User:", user);
             loginLink.style.display = "none";
        homeLink.style.display = "block";
        examLink.style.display = "block";
        profileLink.style.display = "block";             
         logoutLink.style.display = "block";   
            regIdElement.textContent = "RegNo: " + user; // Display RegNo on profile page
    } else {
        console.log("No user found in localStorage.");
        homeLink.style.display = "none";
        examLink.style.display = "none";
        profileLink.style.display = "none";             
        loginLink.style.display = "block";
         logoutLink.style.display = "none";   
    }                   
    
}   
logoutLink.addEventListener("click", function() {
    localStorage.removeItem("RegNo");
    console.log("User logged out. RegNo removed from localStorage.");
    window.location.href = "./login.html";
});
window.onload = onload();