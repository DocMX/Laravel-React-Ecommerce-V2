<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use Illuminate\Support\Facades\Route;

//Guest routes
Route::get('/', [ProductController::class, 'home'])->name('dashboard');
Route::get('/product/{product:slug}', [ProductController::class, 'show'])
    ->name('product.show');

Route::controller(CartController::class)->group(function() {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}', 'store')->name('cart.store');
    Route::put('/cart/add/{product}', 'update')->name('cart.update');
    Route::delete('/cart/add/{product}', 'destroy')->name('cart.destroy');
});

Route::post('/stripe/webhook', [StripeController::class, 'webhook'])
    ->name('stripe.webhook');


//Auth routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::middleware(['verified'])->group(function () {
        Route::post('/cart/checkout', [CartController::class, 'checkout'])
            ->name('cart.checkout');

        Route::get('/stripe/success', [StripeController::class, 'success'])
            ->name('stripe.success');

        Route::get('/stripe/failure', [StripeController::class, 'failure'])
            ->name('stripe.failure');

        Route::post('/stripe/connect', [StripeController::class, 'connect'])
            ->name('stripe.connect')
            ->middleware(['role: ' . \App\Enums\RolesEnum::Vendor->value]);

        Route::get('/stripe/refresh', [StripeController::class, 'refresh'])->name('stripe.refresh');
        Route::get('/stripe/return', [StripeController::class, 'return'])->name('stripe.return');
    });
});

require __DIR__ . '/auth.php';
