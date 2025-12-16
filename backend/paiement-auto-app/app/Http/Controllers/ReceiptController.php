<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipt;
use App\Http\Controllers\Controller;


class ReceiptController extends Controller
{

    public function index()
    {
        $receipts = Receipt::all();
        return response()->json(['receipts' => $receipts], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomComplet' => 'required',
            'paymentType' => 'required',
            'dossierNumber' => 'required',
            'amount'=>'required',
            'date' => 'required|date',
            'classe' => 'required',
            'phoneNumber' => 'nullable',
            'paymentReason' => 'required',
        ]);

        $receipt = Receipt::create($request->all());

        return response()->json(['receipt' => $receipt], 201);
    }

    public function receiptById($id)
    {
        try {
            $receipt = Receipt::findOrFail($id);
            return response()->json(['receipt' => $receipt], 200);
        } catch (\Exception $e) {
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
