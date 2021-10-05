<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\ListaController;

Route::get('lista', [ListaController::class, 'index']);
Route::get('lista/{id}', [ListaController::class, 'show']);
Route::post('lista', [ListaController::class, 'store']);
Route::put('lista/{id}', [ListaController::class, 'update']);
Route::delete('lista/{id}', [ListaController::class, 'destroy']);
