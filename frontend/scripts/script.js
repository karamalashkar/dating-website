const form_signup=document.getElementById('form');
const form_signin=document.getElementById('form-in');

const loadFor = (page) => {
    eval("load_" + page + "();");
}

//landing page
const load_landing = async () => {
    //on submit sign up form
    form_signup.addEventListener('submit' , () => {
        signUp(form_signup);    
    });
    
    //collect user info in sign up
    const signUp=(data)=>{
        const dataUser=new URLSearchParams();
        for (const p of new FormData(data)){
            dataUser.append(p[0],p[1],p[2],p[3],p[4],p[5]);
        }
    }

    //on submit sign in form
    form_signin.addEventListener('submit',()=>{
        signIn(form_signin);
    });

    //collect user info in sign in
    const signIn=(data)=>{
        const dataIn=new URLSearchParams();
        for (const i of new FormData(data)){
            dataIn.append(i[0],i[1]);
        }
    }

}

//home page
const load_home = async () =>{}

//chat page
const load_chat = async () => {}
