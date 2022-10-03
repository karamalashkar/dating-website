<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Hashing\BcryptHasher;
use App\Models\User;
use App\Models\Chat;
use App\Models\Favorite;
use App\Models\Block;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function addUser(Request $request){

        $user= new User;

        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=password_hash($request->password,PASSWORD_DEFAULT);
        $user->location=$request->location;
        $user->gender=$request->gender;
        $user->interest=$request->intersted;
        
        if($user->save()){
            return response()->json([
                'success' => "success",
                'data' => $user
            ]);
        }

        return response()->json([
            'success' => "success",
            'data' =>'error'
        ]);

    }

    //get user using user_id
    function getUser(Request $request){
        $id=$request->user_id;

        $users=User::
                where('id',$id)
                ->get();

        return response()->json([
            'success' => "success",
            'data' => $users
        ]);

    }

    //get all users having the same interest
    function getInterestUser(Request $request){
        $interest=$request->interest_id;

        $users=User::
                where('interest',$interest)
                ->get();

        return response()->json([
            'success' => "success",
            'data' => $users
        ]);

    }

    //send message
    function addMessage(Request $request){
            $chat= new Chat;
    
            $chat->sender_id=$request->id_sender;
            $chat->receiver_id=$request->id_receive;
            $chat->message=$request->message;
            
            if($chat->save()){
                return response()->json([
                    'success' => "success",
                    'data' => $chat
                ]);
            }
    
            return response()->json([
                'success' => "success",
                'data' =>'error'
            ]);
    
    }

    //receive message
    function getMessage(Request $request){
        $users=User::join('chats','chats.sender_id','=','users.id')
        ->where('chats.receiver_id',$request->id)
        ->get(['users.*','chats.message']);

        return response()->json([
            'success' => "success",
            'data' => $users
        ]);
    }

    //get favorite users
    function getFavorite(Request $request){
        $users=User::join('favorites','favorites.favorite_id','=','users.id')
        ->where('user_id',$request->id)
        ->get(['users.*']);

        return response()->json([
            'success' => "success",
            'data' => $users
        ]);
    }

    //add favorite users
    function addFavorite(Request $request){
        $favorite= new Favorite;

        $favorite->user_id=$request->user_id;
        $favorite->favorite_id=$request->favorite_id;
        
        if($favorite->save()){
            return response()->json([
                'success' => "success",
                'data' => $favorite
            ]);
        }

        return response()->json([
            'success' => "success",
            'data' =>'error'
        ]);
    }
    
    //add block users
    function addBlock(Request $request){
        $block= new Block;

        $block->user_id=$request->user_id;
        $block->block_id=$request->block_id;
        
        if($block->save()){
            return response()->json([
                'success' => "success",
                'data' => $block
            ]);
        }

        return response()->json([
            'success' => "success",
            'data' =>'error'
        ]);
    }

}
