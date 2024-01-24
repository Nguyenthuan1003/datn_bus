<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TypeDiscountCodeController;
use App\Http\Controllers\TripController;

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

Route::group(['prefix' => 'trip'], function () {
    Route::get('', [TripController::class, 'index']);
    Route::post('store', [TripController::class, 'store']);
    Route::get('edit/{id}', [TripController::class, 'show']);
    Route::put('update/{id}', [TripController::class, 'update']);
    Route::delete('delete/{id}', [TripController::class, 'destroy']);
});
