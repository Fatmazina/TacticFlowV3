<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
use App\Models\Membership;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user->memberships->isEmpty()) {
            // Récupérer les IDs des projets associés à cet utilisateur dans la table memberships
            $projectIds = $user->memberships->pluck('project_id');
    
            // Récupérer les projets correspondant aux IDs récupérés
            $projects = Project::whereIn('id', $projectIds)->get();
    
            return response()->json($projects);
        } else {
            // Aucune adhésion trouvée, renvoyer un message approprié
            return response()->json(['message' => 'No projects found for this user'], 404);
        }
    }
    public function showProjectsWithRole(Request $request)
    {
        $user = $request->user();
        $chefProjects = [];
        $memberProjects = [];
    
        if (!$user->memberships->isEmpty()) {
            foreach ($user->memberships as $membership) {
            if ($membership->user_role === 'chef') {
                    // Récupérer les IDs des projets pour lesquels l'utilisateur est un chef
                    $chefProjectsIds[] = $membership->project_id;
                } else {
                    // Récupérer les IDs des projets pour lesquels l'utilisateur est un membre
                    $memberProjectsIds[] = $membership->project_id;
                }
            }
    
    
            // Récupérer les projets pour lesquels l'utilisateur est un chef
            if (!empty($chefProjectsIds)) {
                $chefProjects = Project::whereIn('id', $chefProjectsIds)->get();
            }
    
            // Récupérer les projets pour lesquels l'utilisateur est un membre
            if (!empty($memberProjectsIds)) {
                $memberProjects = Project::whereIn('id', $memberProjectsIds)->get();
            }
    
            // Répondre avec les projets en tant qu'admin, chef ou membre selon le rôle de l'utilisateur
            return response()->json([
                'chefProjects' => $chefProjects,
                'memberProjects' => $memberProjects
            ]);
        } else {
            // Aucune adhésion trouvée, renvoyer un message approprié
            return response()->json(['message' => 'No projects found for this user'], 404);
        }
    }
   
    public function store(Request $request)
{
    $user = $request->user();

    // Valider les données envoyées dans la requête
    $validatedData = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'deadline' => 'nullable|date', // Assurez-vous que la date est valide
    ]);

    // Créez un nouveau projet avec les données validées
    try {
        $project = new Project();
        $project->title = $validatedData['title'];
        $project->description = $validatedData['description'];
        $project->user_id = $user->id;
        $project->deadline = $validatedData['deadline']; // Assurez-vous que le nom du champ correspond à celui dans votre modèle Project
        $project->save();
    
        Membership::create([
            'user_id' => $user->id,
            'project_id' => $project->id,
            'user_role' => 'chef',
        ]);
        return response()->json($project, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to create project.'], 500);
    }
}

    public function update(Request $request, Project $project)
    {
        $user = Auth::user();

        if ($project->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $project->update($validatedData);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        // Assurez-vous que le projet appartient à l'utilisateur authentifié
        if ($project->user_id !== auth()->id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        // Supprimez le projet de la base de données
        $project->delete();

        // Répondre avec un statut de succès
        return response()->json(['message' => 'Projet supprimé avec succès']);
    }
    public function showProject(Request $request, $idOrProject)
    {
        $user = Auth::user();
    
        if ($idOrProject instanceof Project) {
            $project = $idOrProject;
        } else {
            $project = Project::where('title', $idOrProject)->first();
        }
    
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }
    
        if ($project->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
    
        return response()->json($project);
    }
 
    public function show($projectId)
    {
        $project = Project::findOrFail($projectId);
        return response()->json($project);
    }
    public function addTask(Request $request, Project $project)
    {
        $user = Auth::user();

        // Vérifiez si l'utilisateur est authentifié
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    
        // Vérifiez si l'utilisateur a le droit d'ajouter une tâche à ce projet
        if ($project->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
    
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);
    
        // Ajoutez la tâche au projet
        $task = $project->tasks()->create($validatedData);
    
        return response()->json($task, 201);
    }
}
