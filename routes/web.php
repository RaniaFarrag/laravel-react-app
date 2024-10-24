<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\TruckRequestController;
use App\Http\Controllers\Admin\AuthController;


Route::group(['prefix' => 'admin'], function(){
    Route::controller(AuthController::class)->group(function(){
        Route::get('login/page', 'getLoginPage')->name('admin.login.page');
        Route::post('login', 'login')->name('admin.login');
        Route::post('logout', [AuthController::class, 'logout'])->middleware('is_admin')
            ->name('admin.logout');

    });
    
    Route::middleware(['is_admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('truck_requests', [TruckRequestController::class, 'listTruckRequests'])
            ->name('admin.truck_requests');

        Route::get('inprogress/{id}', [TruckRequestController::class, 'inProgressTruckRequest'])
            ->name('admin.inprogress');

        Route::get('approve/{id}', [TruckRequestController::class, 'approveTruckRequest'])
            ->name('admin.approve');

    });
});



Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*'); 
