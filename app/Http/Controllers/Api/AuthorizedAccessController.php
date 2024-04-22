<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Membership;

class AuthorizedAccessController extends Controller
{
    public function checkChefPermissions(Request $request)
    {
        try {
            // Récupérer les données de la requête
            $projectId = $request->input('projectId');
            $userId = $request->input('userId');
    
            // Vérifier si l'utilisateur est chef de projet pour le projet spécifié
            $isChef = Membership::where('user_id', $userId)
                ->where('project_id', $projectId)
                ->where('user_role', 'chef')
                ->exists();
    
            // Retourner true si l'utilisateur est un chef de projet
            if ($isChef) {
                return response()->json(['isChef' => true], 200);
            } else {
                return response()->json(['isChef' => false], 200);
            }
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Failed to check chef permissions: ' . $e->getMessage()], 500);
        }
    }
    
}


