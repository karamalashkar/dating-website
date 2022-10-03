<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post("/add_user",[UserController::class, 'addUser']);
Route::post("/user",[UserController::class, 'getUser']);
Route::post("/user_interest",[UserController::class, 'getInterestUser']);
Route::post("/add_message",[UserController::class, 'addMessage']);
Route::post("/get_message",[UserController::class, 'getMessage']);
Route::post("/get_favorite",[UserController::class, 'getFavorite']);