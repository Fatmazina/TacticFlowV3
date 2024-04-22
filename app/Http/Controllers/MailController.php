<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail ;
use App\Mail\MailNotify;
class MailController extends Controller
{
    public function sendEmail(Request $request){
        $data = [
            'subject' => 'Access Request - ' . $request->name,
            'body' => "A new access request has been submitted:\n\n" .
                "Name: " . $request->name . "\n" .
                "Email: " . $request->email . "\n" .
                "Department: " . $request->department. "\n" .
                "role: " . $request->role,
        ];

        try{
   Mail::to('belhouchetmalek01@gmail.com')->send(new MailNotify($data));
   return response()->json(['success' => 'Email sent successfully!']);
        } catch(Exception $th){
            return response()->json(['error' => 'Failed to send email. Please try again later.'], 500);
        }
        
    }
}
