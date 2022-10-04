var user={
	id: 6,
};

var json=JSON.stringify(user);
localStorage.setItem('data',json);

var user_info=localStorage.getItem('data');
var data_user=JSON.parse(user_info);

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
const refresh=document.getElementById('refresh');
const message=document.getElementById('message');
const error_password=document.getElementById('error-password');
const user_name=document.getElementById('user-name');
const user_bio=document.getElementById('user-bio');
const user_age=document.getElementById('user-age');
const user_photo=document.getElementById('user-photo');
const user_list=document.getElementsByName('user-list');
const us=document.querySelector('#us');
const col=document.getElementsByClassName('like');
const block=document.querySelectorAll('.block');

const baseURL= "http://127.0.0.1:8000/api/";

const loadFor = (page) => {
    eval("load_" + page + "();");
}

const getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        console.log("Error from GET API", error);
    }
}

const postAPI = async (api_url, api_data) => {
    try{
        return await axios.post(
            api_url,
            api_data,
        );
    }catch(error){
        console.log("Error from POST API", error);
    }
}


//landing page
const load_landing = async () => {
    //on submit sign up form
    form_signup.addEventListener('submit' , e => {
        signUp(form_signup,e);    
    });
    
    //collect user info in sign up
    const signUp= async(data,e)=>{
		e.preventDefault();
        const dataUser=new URLSearchParams();
        for (const p of new FormData(data)){
            dataUser.append(p[0],p[1],p[2],p[3],p[4],p[5]);
        }
		
		var pass=  /^[A-Za-z]\w{7,14}$/;
			if(dataUser.get('password').match(pass)){
				const url = `${baseURL}add_user`;
				const response = await postAPI(url,dataUser);
				location.reload();	
			}
			else{
				error_password.innerHTML='Please enter a strong Password containing A,a,1,_';
			}
    }

    //on submit sign in form
    form_signin.addEventListener('submit',()=>{
        signIn(form_signin);
    });

    //collect user info in sign in
    const signIn=async (data)=>{
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
    //get user profile
    const userData = new FormData();
	userData.append('user_id',data_user.id);
	const url_user = `${baseURL}user`;
	const response_user = await postAPI(url_user,userData);
	user_name.innerHTML=response_user.data.data[0].name;
	user_bio.innerHTML=response_user.data.data[0].bio;
	user_age.innerHTML=response_user.data.data[0].age;
	//user_photo.src=response_user.data.data[0].picture;
    
    //getting user having same interest
    const userInterest = new FormData();
	userInterest.append('interest_id',response_user.data.data[0].interest);
	const url_interest = `${baseURL}user_interest`;
	const response_interest = await postAPI(url_interest,userInterest);
    for(let i=0;i<response_interest.data.data.length;i++){
        users.innerHTML+=`<div class="user">
        <div class="user-info info">
            <img src="file:///C:/Users/RT/Desktop/dating/dating-website/profile/blank.jpg" class="user-image">
            <h1>${response_interest.data.data[i].name}</h1>
        </div>
        <div class="user-info buttons">
            <button class="user-button like"><i class="fa fa-heart"></i></button>
            <button class="user-button block" onclick='sey()'>Block</button>
        </div>    
        </div>`;
		
    }
	
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
			dataMessage.append("id_sender",data_user.id);
            dataMessage.append("id_receive",chat_id.value);
            dataMessage.append("message",chat_message.value);
            sendMessage();
        }
    });
    
    //show received messages
    const sendMessage = async () => {
		const url_chat = `${baseURL}add_message`;
		const response_chat = await postAPI(url_chat,dataMessage);
	}



    //show received messages
    refresh.addEventListener('click',()=>{
        viewMessage();
    });

    const viewMessage = () => {
        for(let j=0;j<4;j++){
            message.innerHTML+=`<div class="receive-message flex">
            <div class="message-sender">
                <img src="" class="user-image">
                <h1></h1>&nbsp;
                <h1></h1>
            </div>
            <div class="message-body">
                <p></p>
            </div>
            </div>`;
        }
    }
}


