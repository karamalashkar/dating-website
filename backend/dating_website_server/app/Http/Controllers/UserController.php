<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Chat;

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

}
