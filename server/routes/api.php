<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatisticalController;

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


Route::group(['prefix' => 'statistical'], function () {
    Route::get('home', [StatisticalController::class, 'home']);
    Route::get('general', [StatisticalController::class, 'general']);
    Route::get('revenue-trip-year', [StatisticalController::class, 'revenueTripYear']);
    Route::get('revenue-trip-about', [StatisticalController::class, 'revenueTripAbout']);
    Route::get('user', [StatisticalController::class, 'user']);
    Route::get('route', [StatisticalController::class, 'route']);
    Route::get('route-for-year', [StatisticalController::class, 'routeForYear']);
});
