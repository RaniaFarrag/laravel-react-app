<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TruckRequest;

class TruckRequestController extends Controller
{
    public function listTruckRequests()
    {
        $truckRequests = TruckRequest::latest()->get();

        return view('Admin.truckRequests', compact('truckRequests'));
    }

    public function inProgressTruckRequest($request_id)
    {
        $truckRequest = TruckRequest::findOrFail($request_id);
        $truckRequest->update([
            'status' => 1
        ]);

        return redirect()->back()->with(['message' => 'successs']);

    }

    public function approveTruckRequest($request_id)
    {
        $truckRequest = TruckRequest::findOrFail($request_id);
        $truckRequest->update([
            'status' => 2
        ]);

        return redirect()->back()->with(['message' => 'successs']);
        
    }
}
