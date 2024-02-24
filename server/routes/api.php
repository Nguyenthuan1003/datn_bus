<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BillController;

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
Route::group(['prefix' => 'bill'], function () {
    Route::get('', [BillController::class, 'index']);
    Route::post('store', [BillController::class, 'store']);
    Route::get('edit/{id}', [BillController::class, 'show']);
    Route::put('update/{id}', [BillController::class, 'update']);
    Route::delete('delete/{id}', [BillController::class, 'destroy']);
    Route::post('checkin', [BillController::class, 'checkin']);
});