<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TruckRequest;
use App\Models\User;
use Illuminate\Http\Request;
use SebastianBergmann\Type\TrueType;

class AdminController extends Controller
{
    public function index()
    {
        $totalUsers = User::where('is_admin', 0)->count();
        $totalTruckRequests = TruckRequest::count();
        $truckRequests = TruckRequest::latest()->get();
        $pendingTruckRequests = TruckRequest::where('status', 0)->count();

        return view('Admin.dashboard', compact('totalUsers', 'totalTruckRequests', 'truckRequests',
                 'pendingTruckRequests'));
    }
}
