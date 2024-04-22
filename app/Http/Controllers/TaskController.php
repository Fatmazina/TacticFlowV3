<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator; 
use App\Models\TaskMembership;
use App\Models\Membership;

class TaskController extends Controller
{
  public function getTaskDetails($taskId) {
    try {
        $task = Task::find($taskId);
        
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }
        
        return response()->json($task);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to retrieve task details'], 500);
    }
}

  public function index($projectId)
  {
      // Récupérer les tâches associées à un projet spécifique
      $tasks = Task::where('project_id', $projectId)->get();

      return response()->json($tasks);
  }
  public function getTasksByProjectUserId($projectId)
  {
      try {
          // Récupérer l'ID de l'utilisateur authentifié
          $userId = auth()->id();
    
          // Récupérer les tâches associées au projet spécifié par son ID,
          // à l'utilisateur authentifié, en utilisant la table de liaison task_memberships
          $tasks = Task::where('project_id', $projectId)
                       ->whereHas('taskMemberships', function($query) use ($userId, $projectId) {
                           $query->where('user_id', $userId)
                                 ->where('project_id', $projectId);
                       })
                       ->get();
    
          return response()->json($tasks);
      } catch (\Exception $e) {
          return response()->json(['error' => 'Failed to retrieve tasks by project ID.'], 500);
      }
  }
  
  
  
  public function getTasksByProjectId($projectId) {
    $tasks = Task::where('project_id', $projectId)->get(['id', 'title', 'due_date', 'status']); // Ajoutez 'due_date' à la sélection
    return response()->json($tasks);
}

    
    
   // Dans votre contrôleur TaskController.php

public function createTask(Request $request, $projectId) {
  $validator = Validator::make($request->all(), [
      'title' => 'required|string',
      'dueDate' => 'nullable|date', // Assurez-vous que la date est valide
  ]);

  if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
  }

  try {
      $task = new Task();
      $task->title = $request->title;
      $task->project_id = $projectId;
      $task->status = 'To Do';
      $task->due_date = $request->dueDate; // Assurez-vous que le nom du champ correspond à celui dans votre modèle Task
      $task->save();
  

      TaskMembership::create([
        'user_id' => auth()->id(), // ou $request->user()->id si vous utilisez un middleware d'authentification
        'task_id' => $task->id,
        'project_id' => $projectId,
    ]);
    
      return response()->json($task, 201);
  } catch (\Exception $e) {
      return response()->json(['error' => 'Failed to create task.'], 500);
  }
}

    
    public function updateTaskStatus(Request $request, $taskId) {
        $validator = Validator::make($request->all(), [
          'status' => 'required|in:To Do,Doing,Done,Closed', // Ensure valid status
        ]);
      
        if ($validator->fails()) {
          return response()->json($validator->errors(), 400);
        }
      
        try {
          $task = Task::findOrFail($taskId);
          $task->status = $request->get('status'); // Access status from request body
          $task->save();
      
          return response()->json($task);
        } catch (\Exception $e) {
          return response()->json(['error' => 'Failed to update task status.'], 500);
        }
      }
        
      public function deleteTask($taskId) {
        try {
          $task = Task::findOrFail($taskId);
          $task->delete();
      
          return response()->json(['message' => 'Task deleted successfully']);
        } catch (\Exception $e) {
          return response()->json(['error' => 'Failed to delete task.'], 500);
        }
      }



      public function updateTask(Request $request, $taskId)
      {
        $validator = Validator::make($request->all(), [
          'title' => 'nullable|string', // Allow optional title update
          'due_date' => 'nullable|date',  // Allow optional due date update
          'state' => 'nullable|in:To Do,Doing,Done,Closed', // Allow optional state update with validation
        ]);
    
        if ($validator->fails()) {
          return response()->json($validator->errors(), 400);
        }
    
        try {
          $task = Task::findOrFail($taskId);
    
          // Update task properties based on request data (if provided)
          if ($request->has('title')) {
            $task->title = $request->get('title');
          }
          if ($request->has('due_date')) {
            $task->due_date = $request->get('due_date');
          }
    
    
          $task->save();
    
          return response()->json($task);
        } catch (\Exception $e) {
          return response()->json(['error' => 'Failed to update task.'], 500);
        }
      }   
      
}    