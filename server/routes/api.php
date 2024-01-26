<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\TypeCarController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'type-car'], function () {
    Route::get('', [TypeCarController::class, 'index']);
    Route::post('store', [TypeCarController::class, 'store']);
    Route::get('edit/{id}', [TypeCarController::class, 'show']);
    Route::put('update/{id}', [TypeCarController::class, 'update']);
    Route::delete('delete/{id}', [TypeCarController::class, 'destroy']);
});

Route::group(['prefix' => 'cars'], function () {
    Route::get('', [CarController::class, 'index']);
    Route::post('store', [CarController::class, 'store']);
    Route::get('edit/{id}', [CarController::class, 'show']);
    Route::put('update/{id}', [CarController::class, 'update']);
    Route::delete('delete/{id}', [CarController::class, 'destroy']);
});