<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TypeUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'user'], function () {
    Route::get('', [UserController::class, 'index']);
    Route::post('store', [UserController::class, 'store']);
    Route::get('edit/{id}', [UserController::class, 'show']);
    Route::put('update/{id}', [UserController::class, 'update']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
});

Route::group(['prefix' => 'type-user'], function () {
    Route::get('', [TypeUserController::class, 'index']);
    Route::post('store', [TypeUserController::class, 'store']);
    Route::get('edit/{id}', [TypeUserController::class, 'show']);
    Route::put('update/{id}', [TypeUserController::class, 'update']);
    Route::delete('delete/{id}', [TypeUserController::class, 'destroy']);
});