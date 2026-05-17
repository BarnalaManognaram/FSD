async function login(event) {
    event.preventDefault();

    let regNo = document.getElementById("RegNo").value;
    let password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ regNo, password }) // ✅ send to backend
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ store user info
            sessionStorage.setItem("userData", JSON.stringify(data.data));
          console.log("RegNo:", sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).regNo : null);
          console.log("Password:", password);


            // ✅ redirect after success
            window.location.href = "./Home.html";
        } else {
            alert(data.message); // invalid user/password
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to server");
    }
}
