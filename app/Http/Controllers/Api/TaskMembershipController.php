<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaskMembership;
use App\Models\User;

class TaskMembershipController extends Controller
{
       public function create(Request $request)
    {
        // Validation des données de la requête
        $request->validate([
            'email' => 'required|email',
            'taskId' => 'required|exists:tasks,id',
            'projectId' => 'required|exists:projects,id',
        ]);

        try {
            // Recherchez l'utilisateur par son adresse e-mail
            $user = User::where('email', $request->email)->first();

            // Vérifiez si l'utilisateur existe
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Vérifiez si l'association entre l'utilisateur et la tâche existe déjà
            $existingMembership = TaskMembership::where('user_id', $user->id)
                ->where('task_id', $request->taskId)
                ->exists();

            if (!$existingMembership) {
                // Création d'une nouvelle entrée dans la table taskmemberships
                TaskMembership::create([
                    'user_id' => $user->id,
                    'project_id' => $request->projectId,
                    'task_id' => $request->taskId,
                ]);

                return response()->json(['message' => 'Task membership created successfully'], 201);
            } else {
                return response()->json(['message' => 'Member already added to task'], 200);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create task membership: ' . $e->getMessage()], 500);
        }
    }


    public function getUserTaskMemberships(Request $request) {
        try {
            // Récupérer l'utilisateur authentifié
            $user = $request->user();
    
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // Récupérer les tâches pour lesquelles l'utilisateur est membre
            $taskMemberships = TaskMembership::where('user_id', $user->id)->pluck('task_id');
    
            return response()->json($taskMemberships);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve user task memberships'], 500);
        }
    }
    
}
