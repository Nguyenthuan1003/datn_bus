<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\ParentLocationController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TypeDiscountCodeController;
use App\Http\Controllers\TripController;
=======
use App\Http\Controllers\TypeDiscountCodeController;
use App\Http\Controllers\DiscountCodeController;
>>>>>>> 40b4385c12d2116e32298d44190a4c69a30fa840

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
//Route::group(['prefix' => 'parent-location'], function () {
//    Route::get('', [ParentLocationController::class, 'index']);
//    Route::post('store', [ParentLocationController::class, 'store']);
//    Route::get('edit/{id}', [ParentLocationController::class, 'show']);
//    Route::put('update/{id}', [ParentLocationController::class, 'update']);
//    Route::delete('delete/{id}', [ParentLocationController::class, 'destroy']);
//});

Route::group(['prefix' => 'type-discount-code'], function () {
    Route::get('', [TypeDiscountCodeController::class, 'index']);
    Route::post('store', [TypeDiscountCodeController::class, 'store']);
    Route::get('edit/{id}', [TypeDiscountCodeController::class, 'show']);
    Route::put('update/{id}', [TypeDiscountCodeController::class, 'update']);
    Route::delete('delete/{id}', [TypeDiscountCodeController::class, 'destroy']);
});

Route::group(['prefix' => 'discount-code'], function () {
    Route::get('', [DiscountCodeController::class, 'index']);
    Route::post('store', [DiscountCodeController::class, 'store']);
    Route::get('edit/{id}', [DiscountCodeController::class, 'show']);
    Route::put('update/{id}', [DiscountCodeController::class, 'update']);
    Route::delete('delete/{id}', [DiscountCodeController::class, 'destroy']);
});
