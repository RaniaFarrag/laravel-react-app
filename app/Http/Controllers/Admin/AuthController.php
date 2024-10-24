<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function getLoginPage()
    {
        return view('Admin.login');
    }


    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return redirect()->back()->withErrors(['message' => 'Invalid credentials']);
        }
        else if(Auth::user()->is_admin){
            return redirect(route('admin.dashboard'));
        }
        else{
            return redirect()->route('admin.login.page')->with('error', 'Access denied. You are not an admin.');
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        return redirect()->route('admin.login.page');
        
    }

}
