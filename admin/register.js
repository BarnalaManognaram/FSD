document.getElementById("studentForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const cgpa = document.querySelector("[name='cgpa']").value;
    const phone = document.querySelector("[name='phone']").value;
    const regNo = document.querySelector("[name='regNo']").value.trim();

    // ✅ Validations
    if (cgpa < 0 || cgpa > 10) {
        alert("CGPA must be between 0 and 10");
        return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        alert("Phone number must be a valid 10-digit number starting with 6-9");
        return;
    }

    if (regNo.length !== 10) {
        alert("Registration Number must be exactly 10 characters");
        return;
    }

    // ✅ Prepare data
    const formData = {
        name: this.name.value,
        regNo: regNo,
        email: this.email.value,
        course: this.course.value,
        branch: this.branch.value,
        year: this.year.value,
        semester: this.semester.value,
        cgpa: parseFloat(this.cgpa.value),
        phone: phone,
        address: this.address.value
    };

    try {
        // 🔥 API CALL (PORT 3000)
        const response = await fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("successMsg").innerText = "Student Registered Successfully!";
            this.reset();
        } else {
            alert(data.message || "Error creating user");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to server");
    }
});