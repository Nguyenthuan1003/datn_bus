<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\ParentLocationController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TypeDiscountCodeController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\DiscountCodeController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\TypeCarController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TypeUserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\TicketOrderController;

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
    Route::get('', [TripController::class, 'index']);
    Route::get('create', [TripController::class, 'create']);
    Route::get('locations-for-route/{routeId}', [TripController::class, 'getLocationsForRoute']);
    Route::post('store', [TripController::class, 'store']);
    Route::get('edit/{id}', [TripController::class, 'show']);
    Route::put('update/{id}', [TripController::class, 'update']);
    Route::delete('delete/{id}', [TripController::class, 'destroy']);
    Route::get('trip-select/{id}', [TripController::class, 'tripSelect']);
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
Route::group(['prefix' => 'type-user'], function () {
    Route::get('', [TypeUserController::class, 'index']);
    Route::post('store', [TypeUserController::class, 'store']);
    Route::get('edit/{id}', [TypeUserController::class, 'show']);
    Route::put('update/{id}', [TypeUserController::class, 'update']);
    Route::delete('delete/{id}', [TypeUserController::class, 'destroy']);
});

Route::get('search/trip', [TripController::class, 'searchTrip']);

Route::group(['prefix' => 'payment'], function () {
    Route::post('/', [PaymentController::class, 'create']);
});
Route::group(['prefix' => 'bill'], function () {
    Route::get('', [BillController::class, 'index']);
    Route::post('store', [BillController::class, 'store']);
    Route::get('edit/{id}', [BillController::class, 'show']);
    Route::put('update/{id}', [BillController::class, 'update']);
    Route::delete('delete/{id}', [BillController::class, 'destroy']);
    Route::post('checkin', [BillController::class, 'checkin']);
});
Route::resource('role', App\Http\Controllers\RoleController::class)->except('create', 'edit');
Route::group(['prefix' => 'ticket'], function () {
    Route::get('', [TicketOrderController::class, 'index']);
    Route::post('store', [TicketOrderController::class, 'store']);
    Route::get('edit/{id}', [TicketOrderController::class, 'show']);
    Route::delete('delete/{id}', [TicketOrderController::class, 'destroy']);
    Route::post('checkin', [TicketOrderController::class, 'checkin']);
    Route::get('find-ticket', [TicketOrderController::class, 'findTicket']);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('refresh', [AuthController::class, 'refresh']);
Route::post('me', [AuthController::class, 'me']);

// reset password
Route::post('forgotpassword', [AuthController::class, 'forgotPasswordSubmit'])->name('forgot.password.submit');
