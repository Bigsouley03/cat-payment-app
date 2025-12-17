<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipt;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;



class ReceiptController extends Controller
{

public function index()
{
    Log::info('=== GET ALL RECEIPTS INITIÉ ===');

    try {
        $receipts = Receipt::all();

        Log::info('=== GET ALL RECEIPTS SUCCÈS ===', [
            'total' => $receipts->count(),
        ]);

        return response()->json(['receipts' => $receipts], 200);

    } catch (\Exception $e) {

        Log::error('=== ERREUR GET ALL RECEIPTS ===', [
            'error' => $e->getMessage(),
        ]);

        return response()->json(
            ['error' => 'Erreur lors de la récupération des reçus'],
            500
        );
    }
}


public function store(Request $request)
{
    Log::info('=== STORE RECEIPT INITIÉ ===', [
        'payload' => $request->all(),
        'ip' => $request->ip(),
    ]);

    $request->validate([
        'nomComplet' => 'required',
        'paymentType' => 'required',
        'dossierNumber' => 'required',
        'amount' => 'required',
        'date' => 'required|date',
        'classe' => 'required',
        'phoneNumber' => 'nullable',
        'paymentReason' => 'required',
    ]);

    $receipt = Receipt::create($request->all());

    Log::info('=== RECEIPT CRÉÉ AVEC SUCCÈS ===', [
        'receipt_id' => $receipt->id,
        'receipt' => $receipt,
    ]);

    return response()->json(['receipt' => $receipt], 201);
}


public function receiptById($id)
{
    Log::info('=== GET RECEIPT INITIÉ ===', [
        'receipt_id' => $id,
    ]);

    try {
        $receipt = Receipt::findOrFail($id);

        Log::info('=== RECEIPT TROUVÉ ===', [
            'receipt_id' => $receipt->id,
        ]);

        return response()->json(['receipt' => $receipt], 200);

    } catch (\Exception $e) {

        Log::warning('=== RECEIPT NON TROUVÉ ===', [
            'receipt_id' => $id,
            'error' => $e->getMessage(),
        ]);

        return response()->json(['error' => 'Reçu non trouvé.'], 404);
    }
}


    public function update(Request $request, $id)
    {
        $request->validate([
            'nomComplet' => 'required',
            'paymentType' => 'required',
            'dossierNumber' => 'required',
            'date' => 'required|date',
            'classe' => 'required',
            'phoneNumber' => 'required',
            'paymentReason' => 'required',
        ]);

        $receipt = Receipt::findOrFail($id);
        $receipt->update($request->all());

        return response()->json(['receipt' => $receipt], 200);
    }

    public function destroy($id)
    {
        $receipt = Receipt::findOrFail($id);
        $receipt->delete();

        return response()->json(['message' => 'Reçu supprimé avec succès.'], 200);
    }
}

