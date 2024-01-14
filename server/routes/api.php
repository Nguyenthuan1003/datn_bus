<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentLocationController;
use App\Http\Controllers\LocationController;

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
Route::group(['prefix' => 'parent-location'], function () {
    Route::get('', [ParentLocationController::class, 'index']);
    Route::post('store', [ParentLocationController::class, 'store']);
    Route::get('edit/{id}', [ParentLocationController::class, 'show']);
    Route::put('update/{id}', [ParentLocationController::class, 'update']);
    Route::delete('delete/{id}', [ParentLocationController::class, 'destroy']);
});

Route::group(['prefix' => 'locations'], function () {
    Route::get('', [ParentLocationController::class, 'index']);
    Route::post('store', [ParentLocationController::class, 'store']);
    Route::get('edit/{id}', [ParentLocationController::class, 'show']);
    Route::put('update/{id}', [ParentLocationController::class, 'update']);
    Route::delete('delete/{id}', [ParentLocationController::class, 'destroy']);
});
