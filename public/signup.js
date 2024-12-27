document.addEventListener("DOMContentLoaded", () =>  {
    const signUp = document.getElementById("signUpForm");
    if(signUp){
        signUp.addEventListener("submit",async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/api/signup", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name,email,phone,password}),
            });
            const result = await response.text();
            if(result === "success"){
                window.location.href = "/login";
            }
            else{
                alert(result);
            }

        })
    }
    const login = document.getElementById("loginPage");
    if(login){
        login.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "./login.html";
        })
    }
});
