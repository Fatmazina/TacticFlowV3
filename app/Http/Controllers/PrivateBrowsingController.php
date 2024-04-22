<?php

namespace App\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrivateBrowsingController extends Controller
{
  public function authenticate(Request $request)
  {
    if (!$request->isPrivateBrowsing()) {
      abort(403);
    }

    $credentials = $request->only('email', 'password');
    $token = Auth::attempt($credentials);

    if (!$token) {
      return response()->json(['error' => 'Invalid credentials'], 401);
    }

    localStorage.setItem('authToken', token);

    return response()->json(['success' => true]);
  }
}
