<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post("/add_user",[UserController::class, 'addUser']);
Route::post("/user",[UserController::class, 'getUser']);

