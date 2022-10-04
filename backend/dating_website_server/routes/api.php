<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::group(["middleware" => "auth:api"], function(){
    Route::post("/user",[UserController::class, 'getUser']);
    Route::post("/user_interest",[UserController::class, 'getInterestUser']);
    Route::post("/add_message",[UserController::class, 'addMessage']);
    Route::post("/get_message",[UserController::class, 'getMessage']);
    Route::post("/get_favorite",[UserController::class, 'getFavorite']);
    Route::post("/add_favorite",[UserController::class, 'addFavorite']);
    Route::post("/add_block",[UserController::class, 'addBlock']);
}); 

Route::post("/login",[AuthController::class, 'login'])->name("login");
Route::post("/add_user",[UserController::class, 'addUser']);

