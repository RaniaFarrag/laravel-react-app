<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TruckController;


Route::controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/truck_request', [TruckController::class, 'requestTruck']);
    Route::get('/list_truck_requests', [TruckController::class, 'listTruckRequests']);
    Route::get('/logout', [AuthController::class, 'logout']);

});


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



