<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\ListaController;
use App\Http\Controllers\api\UserController;

//CRUD de lista
Route::get('lista', [ListaController::class, 'index']);
Route::get('listaUserActive', [ListaController::class, 'getUserListActive']);
Route::get('listaUserInactive', [ListaController::class, 'getUserListInactive']);
Route::get('lista/{id}', [ListaController::class, 'show']);
Route::post('lista', [ListaController::class, 'store']);
Route::put('lista/{id}', [ListaController::class, 'update']);
Route::delete('lista/{id}', [ListaController::class, 'destroy']);


//CRUD de usuario
Route::get('user', [UserController::class, 'index']);
Route::get('user/{id}', [UserController::class, 'show']);
Route::post('user', [UserController::class, 'store']);
Route::put('user/{id}', [UserController::class, 'update']);
Route::delete('user/{id}', [UserController::class, 'destroy']);


//POST de login
Route::get('login', [UserController::class, 'getLogin']);
