<?php

use App\Http\Controllers\ReceiptController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/receipts', [ReceiptController::class, 'index']);
Route::get('/receipt/{id}', [ReceiptController::class, 'receiptById']);
Route::post('/storeReceipt', [ReceiptController::class, 'store']);
Route::put('/edit/{id}', [ReceiptController::class, 'update']);
Route::delete('/delete/{id}', [ReceiptController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
