async function onload() {
    const user = localStorage.getItem('RegNo');    

    const homeLink = document.getElementById("homeLink");   
    const examLink = document.getElementById("ExamLink");
    const profileLink = document.getElementById("profileLink");
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const regIdElement = document.getElementById("regId");
    const nameElement = document.getElementById("name");
    const courseElement = document.getElementById("course");
    const branchElement = document.getElementById("branch");
    const yearElement = document.getElementById("year");
    const cgpaElement = document.getElementById("cgpa");
    const phoneElement = document.getElementById("phone");
    const addressElement = document.getElementById("address");
    const emailElement = document.getElementById("email");

    // ✅ attach event safely
    if (logoutLink) {
        logoutLink.addEventListener("click", function() {
            localStorage.removeItem("RegNo");
            console.log("User logged out.");
            window.location.href = "./login.html";
        });
    }

    if (user) {
        console.log("User:", user);

        if (loginLink) loginLink.style.display = "none";
        if (homeLink) homeLink.style.display = "block";
        if (examLink) examLink.style.display = "block";
        if (profileLink) profileLink.style.display = "block";
        if (logoutLink) logoutLink.style.display = "block";

        if (regIdElement) {
            regIdElement.textContent = "RegNo: " + user;
        }

        try {
            const response = await fetch(`http://localhost:3000/?regNo=${user}`);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const userData = (await response.json()).data[0];
            console.log("User data:", userData);

            if (nameElement) nameElement.textContent = "Name: " + userData.name;
            if (courseElement) courseElement.textContent = "Course: " + userData.course;
            if (branchElement) branchElement.textContent = "Branch: " + userData.branch;
            if (yearElement) yearElement.textContent = "Year: " + userData.year;
            if (cgpaElement) cgpaElement.textContent = "CGPA: " + userData.cgpa;
            if (phoneElement) phoneElement.textContent = "Phone: " + userData.phone;
            if (addressElement) addressElement.textContent = "Address: " + userData.address;
            if (emailElement) emailElement.textContent = "Email: " + userData.email;

        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to load info. Check backend/server.");
        }

    } else {
        console.log("No user found.");

        if (homeLink) homeLink.style.display = "none";
        if (examLink) examLink.style.display = "none";
        if (profileLink) profileLink.style.display = "none";
        if (loginLink) loginLink.style.display = "block";
        if (logoutLink) logoutLink.style.display = "none";
    }
}

// ✅ correct way
window.addEventListener("DOMContentLoaded", onload);