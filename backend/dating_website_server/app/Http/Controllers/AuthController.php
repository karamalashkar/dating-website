<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Print_;
use App\Models\User;
use App\Traits\ResponseJson;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

use App\Models\Favorite;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Database\Console\Migrations\StatusCommand;
use Namshi\JOSE\JWS;

class AuthController extends Controller{

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $id=User::
            where('email',$request->email)
            ->get('id');
        
        return $this->respondWithToken($token,$id);
    }

    protected function respondWithToken($token,$id)
    {
        return response()->json([
            'id'=>$id,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1000
        ]);
    }
    
     
}

