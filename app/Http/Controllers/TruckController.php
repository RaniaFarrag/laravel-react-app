<?php

namespace App\Http\Controllers;

use App\Models\TruckRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class TruckController extends Controller
{
    public function requestTruck(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'weight' => 'required|numeric',
            'size' => 'required|numeric',
            'date' =>'required|date',
        ]);

        $truckRequest = TruckRequest::create([
            'address' => $request->address,
            'weight' => $request->weight,
            'size' => $request->size,
            'date' => $request->date,
            'status' => 0,
            'user_id' => Auth::id() 
        ]);

        return response()->json(['message' => 'The Request Added Successfully!',
            'truckRequest' => $truckRequest]);

    }

    public function listTruckRequests(Request $request)
    {
        $truckRequests = TruckRequest::where('user_id', Auth::id())->with('user')->latest()->get();
        if ($truckRequests->isEmpty()) {
            return response()->json(['message' => 'No truck requests found.'], 404);
        }
        return response()->json($truckRequests);
    }
}
