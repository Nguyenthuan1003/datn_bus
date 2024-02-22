<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RouteController;

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

Route::group(['prefix' => 'route'], function () {
    Route::get('', [RouteController::class, 'index']);
    Route::post('store', [RouteController::class, 'store']);
    Route::get('edit/{id}', [RouteController::class, 'show']);
    Route::put('update/{id}', [RouteController::class, 'update']);
    Route::delete('delete/{id}', [RouteController::class, 'destroy']);
});