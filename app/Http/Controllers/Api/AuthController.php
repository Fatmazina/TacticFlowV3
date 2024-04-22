<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\Project;
use App\Models\User;
use App\Models\AuthorizedUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail; // Importez la classe Mail
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\JsonResponse;
use Illuminate\Mail\Mailer;
use Illuminate\Support\Facades\DB; // Ajout de l'utilisation de la classe DB
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Mail\Message;
use Laravel\Socialite\Contracts\User as SocialiteUser;
class AuthController extends Controller
{
   
    public function signup(SignupRequest $request)
{
    $data = $request->validated();

    // Check if the user's email exists in authorized_users table
    $authorizedUser = AuthorizedUser::where('email', $data['email'])->first();

    if ($authorizedUser) {
        // User is authorized, create an account in the users table
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'departement'=>$data['departement'],
            'role' => $authorizedUser->role
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    } else {
        // User is not authorized, return an error message
        return response()->json(['error' => 'You dont have access to create an account.'], 403);
    }
}


    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
 
    
    public function logout(Request $request)
    {
        try {
            /** @var \App\Models\User $user */
            $user = $request->user();
            $user->currentAccessToken()->delete();
            return response('', 204);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Logout error: ' . $e->getMessage());
            // Return a response with error message
            return response()->json(['error' => 'Logout failed'], 500);
        }
    }
    

  
    public function handleGoogleCallback(Request $request)
    {
        try {
            $user = $request->input('user');

            // Check if the user already exists in the Laravel database
            $existingUser = User::where('email', $user['email'])->first();

            if (!$existingUser) {
                // User doesn't exist, create a new user in the Laravel database
                $newUser = $this->createUserFromGoogle($user);
                Auth::login($newUser);
            } else {
                // User already exists, log in
                Auth::login($existingUser);
            }

            // Get the authenticated user and generate a token
            $authenticatedUser = Auth::user();
            $token = $authenticatedUser->createToken('main')->plainTextToken;

            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            // Handle the exception
            return response()->json(['error' => 'Google login failed. Please try again.'], 500);
        }
    }

    private function createUserFromGoogle(array $userData)
    {
        return User::create([
            'name' => $userData['displayName'],
            'email' => $userData['email'],
            'password' => bcrypt(Str::random(16)),
        ]);
    }
    public function passwordReset(Request $request)
    {
        try {
            // Validation de la requête
            $data = $request->validate([
                'email' => 'required|email',
            ]);

            // Vérifier si l'utilisateur existe
            $user = User::where('email', $data['email'])->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Aucun utilisateur trouvé avec cette adresse email.'
                ], 404);
            }

           

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur s\'est produite lors de l\'envoi de l\'email de réinitialisation du mot de passe. Veuillez réessayer ultérieurement.'
            ], 500);
        
}}
public function newPassword(ResetPasswordRequest $request)
{
    try {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'Aucun utilisateur trouvé avec cette adresse email.'
            ], 404);
        }

        $user->password = bcrypt($data['password']);
        $user->save();

        // Retourner une réponse JSON pour une requête AJAX
        return response()->json([
            'message' => 'Mot de passe modifié avec succès.'
        ], 200);

        // Si vous souhaitez rediriger depuis le serveur, vous ne devez pas avoir de deuxième return ici
        // return redirect('/login')->with('success', 'Mot de passe modifié avec succès.');
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Une erreur s\'est produite lors de la modification du mot de passe.'
        ], 500);
    }
}


}

