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
const user_interest=document.getElementById('user-int');
const user_location=document.getElementById('user-loc');
const user_photo=document.getElementById('user-photo');
const logout=document.getElementById('logout');

const ka=document.getElementById('ka');

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

const postAPI = async (api_url, api_data, api_token = null) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                    'Authorization' : "Bearer" + api_token
                }
            }
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
			if(dataUser.get('password_up').match(pass)){
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
		
		const url_login = `${baseURL}login`;
		const response_login = await postAPI(url_login,dataIn).then((response)=>{
			localStorage.setItem('id',response.data.id[0].id);
			localStorage.setItem('token',response.data.access_token);
			window.location.replace('../frontend/home.html');
			tok=localStorage.getItem('token');	
		});
		
	}

    //switch between sign up and sign in
    change.addEventListener('click',()=>{
        signin.style.display='block';
        signup.style.display='none';
    })

}

//home page
const load_home = async () =>{
	
	var id=localStorage.getItem('id');
	var token=localStorage.getItem('token');
    
	if(token=='' || id==''){
		window.location.replace('../frontend/index.html');
	}
	
	//get user profile
    const userData = new FormData();
	userData.append('user_id',id);
	const url_user = `${baseURL}user`;
	const response_user = await postAPI(url_user,userData,token);
	user_name.innerHTML=response_user.data.data[0].name;
	user_bio.innerHTML=response_user.data.data[0].bio;
	user_age.innerHTML=response_user.data.data[0].age;
	user_photo.src=response_user.data.data[0].picture;
    
    //getting user having same interest
    const userInterest = new FormData();
	userInterest.append('id',id);
	userInterest.append('interest_id',response_user.data.data[0].interest);
	const url_interest = `${baseURL}user_interest`;
	const response_interest = await postAPI(url_interest,userInterest,token);
    for(let i=0;i<response_interest.data.data.length;i++){
        users.innerHTML+=`<div class="user col">
		<div class='user-card'>
        <div class="user-info info">
            <img src="" class="user-image">
            <h1>${response_interest.data.data[i].name}</h1>
			<h1 class="user-list">${response_interest.data.data[i].id}</h1>
        </div>
        <div class="user-info buttons">
            <button class="user-button like"><i class="fa fa-heart"></i></button>
            <button class="user-button block" onclick='sey()'>Block</button>
        </div>
		</div>
		<div class='show-bio'>
		<h1>${response_interest.data.data[i].bio}</h1>
		<div>	
        </div>`;		
    }
	
    //open favorite form
    favorite.addEventListener('click',()=>{
        favorite_form.style.display='flex';
		showFavorites();
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
	const showFavorites = async ()=>{
		const dataFavorite = new FormData();
		dataFavorite.append('id',id);
		const url_favorite = `${baseURL}get_favorite`;
		const response_favorite = await postAPI(url_favorite,dataFavorite,token);
		for(let y=0;y<response_favorite.data.data.length;y++){
        favorite_list.innerHTML+=`<div class="user fav">
			<img src="${response_favorite.data.data[y].picture}" class="user-image">
		<h1 class='favorite-name'>${response_favorite.data.data[y].name}</h1>  
			</div>`;
		}
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
					formData.append('status','imageOnly');
                    formData.append("image", reader.result);
					console.log(reader.result);
                    editProfile();
                });
                reader.readAsDataURL(photo.files[0]);
            }            
        }        
        else{
            if(photo.value==''){
                formData.append("bio", bio.value);
                formData.append("age", age.value);
				formData.append('status','noImage');
                editProfile();
            }
            else{
                formData.append("bio", bio.value);
                formData.append("age", age.value);
				formData.append('status','all');
                reader.addEventListener("load", () => {
                    formData.append("image", reader.result);
                    editProfile();
                });
                reader.readAsDataURL(photo.files[0]);
            }        
        }
    });

    const editProfile = async () => {
		formData.append('id',id);
		const url_edit = `${baseURL}edit`;
		const response_edit = await postAPI(url_edit,formData,token);
        location.reload();
    }

    logout.addEventListener('click',()=>{
        window.localStorage.clear();
        window.location.replace('../frontend/index.html');
    });
}
    

//chat page
const load_chat = async () => {
	
	if(token=='' || id==''){
		window.location.replace('../frontend/index.html');
	}
	
	var id=localStorage.getItem('id');
	var token=localStorage.getItem('token');
    //send message
    const dataMessage = new FormData();

    send.addEventListener('click',()=>{
        if(chat_id.value == '' || chat_message.value == ''){
            error_chat.innerHTML="Please enter information";
        }

        else{
			dataMessage.append("id_sender",id);
            dataMessage.append("id_receive",chat_id.value);
            dataMessage.append("message",chat_message.value);
            sendMessage();
        }
    });
    
    //show received messages
    const sendMessage = async () => {
		const url_chat = `${baseURL}add_message`;
		const response_chat = await postAPI(url_chat,dataMessage,token);
        location.reload();
    }

    //show received messages
    refresh.addEventListener('click',()=>{
        viewMessage();
    });

    const viewMessage = async () => {
		const dataChat = new FormData();
		dataChat.append('id',id);
		const url_message = `${baseURL}get_message`;
		const response_message = await postAPI(url_message,dataChat,token);
        
		for(let j=0;j<response_message.data.data.length;j++){
            message.innerHTML+=`<div class="receive-message flex">
            <div class="message-sender">
                <img src="${response_message.data.data[j].picture}" class="user-image">
                <h1>${response_message.data.data[j].id}</h1>&nbsp;
                <h1>${response_message.data.data[j].name}</h1>
            </div>
            <div class="message-body">
                <p>${response_message.data.data[j].message}</p>
            </div>
            </div>`;
        }
    }
}
