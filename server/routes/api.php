<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\ParentLocationController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TypeDiscountCodeController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\DiscountCodeController;
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

Route::group(['prefix' => 'route'], function () {
    Route::get('', [RouteController::class, 'index']);
    Route::post('store', [RouteController::class, 'store']);
    Route::get('edit/{id}', [RouteController::class, 'show']);
    Route::put('update/{id}', [RouteController::class, 'update']);
    Route::delete('delete/{id}', [RouteController::class, 'destroy']);
});
Route::group(['prefix' => 'parent-location'], function () {
    Route::get('/', [ParentLocationController::class, 'index']);
    Route::post('store', [ParentLocationController::class, 'store']);
    Route::get('edit/{id}', [ParentLocationController::class, 'show']);
    Route::put('update/{id}', [ParentLocationController::class, 'update']);
    Route::delete('delete/{id}', [ParentLocationController::class, 'destroy']);
});

Route::group(['prefix' => 'locations'], function () {
    Route::get('/', [LocationController::class, 'index']);
    Route::post('store', [LocationController::class, 'store']);
    Route::get('edit/{id}', [LocationController::class, 'show']);
    Route::put('update/{id}', [LocationController::class, 'update']);
    Route::delete('delete/{id}', [LocationController::class, 'destroy']);
});
Route::group(['prefix' => 'trip'], function () {
    Route::get('/', [TripController::class, 'index']);
    Route::post('store', [TripController::class, 'store']);
    Route::get('edit/{id}', [TripController::class, 'show']);
    Route::put('update/{id}', [TripController::class, 'update']);
    Route::delete('delete/{id}', [TripController::class, 'destroy']);
});

Route::group(['prefix' => 'type-discount-code'], function () {
    Route::get('/', [TypeDiscountCodeController::class, 'index']);
    Route::post('store', [TypeDiscountCodeController::class, 'store']);
    Route::get('edit/{id}', [TypeDiscountCodeController::class, 'show']);
    Route::put('update/{id}', [TypeDiscountCodeController::class, 'update']);
    Route::delete('delete/{id}', [TypeDiscountCodeController::class, 'destroy']);
});

Route::group(['prefix' => 'discount-code'], function () {
    Route::get('/', [DiscountCodeController::class, 'index']);
    Route::post('store', [DiscountCodeController::class, 'store']);
    Route::get('edit/{id}', [DiscountCodeController::class, 'show']);
    Route::put('update/{id}', [DiscountCodeController::class, 'update']);
    Route::delete('delete/{id}', [DiscountCodeController::class, 'destroy']);
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
