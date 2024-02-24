<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeatController;

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

Route::group(['prefix' => 'seats'], function () {
    Route::get('', [SeatController::class, 'index']);
    Route::get('edit/{id}', [SeatController::class, 'show']);
    Route::post('store', [SeatController::class, 'store']);
    Route::put('update/{id}', [SeatController::class, 'update']);
    Route::delete('delete/{id}', [SeatController::class, 'destroy']);
});
