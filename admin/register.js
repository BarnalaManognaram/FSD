document.getElementById("studentForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const cgpa = document.querySelector("[name='cgpa']").value;

        if (cgpa < 0 || cgpa > 10) {
            alert("CGPA must be between 0 and 10");
            return;
        }
        if (!/^[6-9][0-9]{9}$/.test(document.querySelector("[name='phone']").value)) {
            alert("Phone number must be a valid 10-digit number starting with 6-9");
            return;
        }
        if((String)(document.querySelector("[name='regNo']").value.trim()).length !=10) {
            alert("Registration Number must be exactly 10 characters long");
            return;
        }

        document.getElementById("successMsg").innerText = "Student Registered Successfully!";
        this.reset();
    });