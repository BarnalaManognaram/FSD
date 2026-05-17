async function onload() {

    // =========================
    // SPLASH SCREEN
    // =========================
    const splash = document.getElementById("splash");
    const mainContent = document.getElementById("mainContent");

    // =========================
    // STORED USER DATA
    // =========================
    const userData =
        JSON.parse(sessionStorage.getItem("userData"));
  
        if (!userData) {
            window.location.href = "./index.html";
        }

    // =========================
    // NAV LINKS
    // =========================
    const homeLink = document.getElementById("homeLink");
    const examLink = document.getElementById("ExamLink");
    const profileLink = document.getElementById("profileLink");
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");

    // =========================
    // PROFILE ELEMENTS
    // =========================
    const regIdElement = document.getElementById("regId");
    const nameElement = document.getElementById("name");
    const courseElement = document.getElementById("course");
    const branchElement = document.getElementById("branch");
    const yearElement = document.getElementById("year");
    const cgpaElement = document.getElementById("cgpa");
    const phoneElement = document.getElementById("phone");
    const addressElement = document.getElementById("address");
    const emailElement = document.getElementById("email");

    // =========================
    // LOGOUT
    // =========================
    if (logoutLink) {

        logoutLink.addEventListener("click", () => {

            sessionStorage.removeItem("userData");

            console.log("User logged out.");

            window.location.href = "./login.html";
        });
    }

    // =========================
    // USER EXISTS
    // =========================
    if (userData) {

        console.log("Stored User Data:", userData);

        // SHOW NAV LINKS
        if (loginLink)
            loginLink.style.display = "none";

        if (homeLink)
            homeLink.style.display = "block";

        if (examLink)
            examLink.style.display = "block";

        if (profileLink)
            profileLink.style.display = "block";

        if (logoutLink)
            logoutLink.style.display = "block";

        // SHOW USER DETAILS
        if (regIdElement)
            regIdElement.textContent =
                `RegNo : ${userData.regNo}`;

        if (nameElement)
            nameElement.textContent =
                `Name : ${userData.name}`;

        if (courseElement)
            courseElement.textContent =
                `Course : ${userData.course}`;

        if (branchElement)
            branchElement.textContent =
                `Branch : ${userData.branch}`;

        if (yearElement)
            yearElement.textContent =
                `Year : ${userData.year}`;

        if (cgpaElement)
            cgpaElement.textContent =
                `CGPA : ${userData.cgpa}`;

        if (phoneElement)
            phoneElement.textContent =
                `Phone : ${userData.phone}`;

        if (addressElement)
            addressElement.textContent =
                `Address : ${userData.address}`;

        if (emailElement)
            emailElement.textContent =
                `Email : ${userData.email}`;

    } else {

        console.log("No user found.");

        // HIDE LINKS
        if (homeLink)
            homeLink.style.display = "none";

        if (examLink)
            examLink.style.display = "none";

        if (profileLink)
            profileLink.style.display = "none";

        if (logoutLink)
            logoutLink.style.display = "none";

        // SHOW LOGIN
        if (loginLink)
            loginLink.style.display = "block";
    }

    // =========================
    // SPLASH -> HOME
    // =========================
    setTimeout(() => {

        if (splash) {

            splash.style.opacity = "0";

            setTimeout(() => {

                splash.style.display = "none";

                if (mainContent) {

                    mainContent.style.display =
                        "block";
                }

            }, 500);
        }

    }, 3000);
}

// =========================
// PAGE LOAD
// =========================
window.addEventListener(
    "DOMContentLoaded",
    onload
);