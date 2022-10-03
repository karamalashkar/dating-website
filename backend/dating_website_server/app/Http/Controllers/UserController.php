<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Hashing\BcryptHasher;
use App\Models\User;
use App\Models\Chat;
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
}
