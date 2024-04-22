<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function createNotification(Request $request)
    {

        Notification::create([
            'user_id' => Auth::user()->id, 
            'notification' => $request->message,
        ]);

        return response()->json(['message' => 'Notification created successfully'], 200);
    }
    public function getUserNotifications(Request $request)
    {
        $userNotifications = Notification::where('user_id', Auth::id())->get();
        return response()->json(['notifications' => $userNotifications], 200);
    }
}
