const form_signup=document.getElementById('form');
const form_signin=document.getElementById('form-in');
const signup=document.getElementById('sign-up');
const signin=document.getElementById('sign-in');
const change=document.getElementById('change');
const favorite=document.getElementById('open-favorite');
const favorite_form=document.getElementById('favorite-form');
const close_favorite=document.getElementById('close-favorite');
const favorite_list=document.getElementById('favorite-list');
const open_edit=document.getElementById('open-edit');
const close_edit=document.getElementById('close-edit');
const edit=document.getElementById('edit');
const users=document.getElementById('users');
const edit_profile=document.getElementById('edit-profile');
const photo=document.getElementById('photo');
const bio=document.getElementById('bio');
const age=document.getElementById('age');
const error_edit=document.getElementById('error');
const error_chat=document.getElementById('error-chat');
const chat_id=document.getElementById('chat-id');
const chat_message=document.getElementById('chat-message');
const send=document.getElementById('send');

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

    //switch between sign up and sign in
    change.addEventListener('click',()=>{
        signin.style.display='block';
        signup.style.display='none';
    })

}

//home page
const load_home = async () =>{
    //open favorite form
    favorite.addEventListener('click',()=>{
        favorite_form.style.display='flex';
    });

    //close favorite form
    close_favorite.addEventListener('click',()=>{
        favorite_form.style.display='none';
    });

    //open edit form
    open_edit.addEventListener('click',()=>{
        edit.style.display='flex';
    });

    //close edit form
    close_edit.addEventListener('click',()=>{
        edit.style.display='none';
    });

    //show favorite list
    for(let i=0;i<5;i++){
        favorite_list.innerHTML+=`<div class="user">
        <img src="" class="user-image">
        <h1></h1>  
        </div>`;
    }

    // show users
    for(let i=0;i<5;i++){
        users.innerHTML+=`<div class="user">
        <div class="user-info info">
            <img src="" class="user-image">
            <h1></h1>
        </div>
        <div class="user-info buttons">
            <button class="user-button"><i class="fa fa-heart"></i></button>
            <button class="user-button">Block</button>
        </div>    
        </div>`;
    }

    //edit profile
    const reader = new FileReader();
    const formData = new FormData();

    edit_profile.addEventListener('click',()=>{
        if(bio.value == '' || age.value == ''){
            if(photo.value == ''){
                error_edit.innerHTML='Please enter information';
            }
            else{
                reader.addEventListener("load", () => {
                    formData.append("image", reader.result);
                    editProfile();
                });
                reader.readAsDataURL(photo.files[0]);
            }            
        }        
        else{
            if(photo.value==''){
                formData.append("bio", bio.value);
                formData.append("age", bio.age);
                editProfile();
            }
            else{
                formData.append("bio", bio.value);
                formData.append("age", bio.age);
                reader.addEventListener("load", () => {
                    formData.append("image", reader.result);
                    editProfile();
                });
                reader.readAsDataURL(photo.files[0]);
            }        
        }
    });

    const editProfile = () => {
        location.reload();
    }
}

//chat page
const load_chat = async () => {

    //send message
    const dataMessage = new FormData();

    send.addEventListener('click',()=>{
        if(chat_id.value == '' || chat_message.value == ''){
            error_chat.innerHTML="Please enter information";
        }

        else{
            dataMessage.append("id",chat_id.value);
            dataMessage.append("message",chat_message.value);
            sendMessage();
        }
    });
    
    const sendMessage = () => {}

}

    