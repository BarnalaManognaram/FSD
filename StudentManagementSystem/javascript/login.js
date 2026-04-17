function login(event) {
    event.preventDefault(); // stop page reload

    let regNo = document.getElementById("RegNo").value;
    let password = document.getElementById("password").value;

    localStorage.setItem("RegNo", regNo);
    console.log("RegNo:", localStorage.getItem("RegNo"));
    console.log("Password:", password);
    // localStorage.removeItem("RegNo")
     window.location.href = "./Home.html";
}
