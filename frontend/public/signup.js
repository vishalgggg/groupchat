document.addEventListener("DOMContentLoaded", () =>  {
    const signUpForm = document.getElementById("signUpForm");
    if(signUpForm){
        signUpForm.addEventListener("submit",async (e) => {
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
    const loginPage = document.getElementById("loginPage");
    if(loginPage){
        loginPage.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "./login.html";
        })
    }
    const loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit",async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/api/login",{
                method : "POST",
                headers : {"Content-Type":"application/json"},
                body:JSON.stringify({email,password}),
            })
            const result = await response.json();
            console.log(result);
            if(response.ok){
                alert("Login successful");
                localStorage.setItem("token",result.token);
                window.location.href = "./home.html";

            }
            else{
                if(result.message === "success"){
                    alert("Login successful");
                }
                else if(result === "email not found"){
                    alert("Incorrect email");
                }
                else if(result === "password incorrect"){
                    alert("Incorrect password");
                }else{
                    alert(result);
                }
            }
        })
    }
    const signUpPage = document.getElementById("signUpPage");
    if(signUpPage){
        signUpPage.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "./index.html";
        })
    }
});
