<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NotificationController;

use App\Http\Controllers\MailController;
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\TaskMembershipController;
use App\Http\Controllers\Api\AuthorizedAccessController;

use App\Http\Controllers\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/projects/{projectId}/tasks', [TaskController::class, 'getTasksByProjectId']);
    Route::post('/projects/{projectId}/tasks', [TaskController::class, 'createTask']);
    Route::post('/tasks/{taskId}/status', [TaskController::class, 'updateTaskStatus']);
    Route::delete('/tasks/{taskId}', [TaskController::class, 'deleteTask']);
    Route::get('/tasks/{taskId}', [TaskController::class, 'getTaskDetails']);
    Route::post('/tasks/{taskId}', [TaskController::class, 'updateTask']);


    Route::get('projects/{projectId}/members', [UserController::class, 'index1']);
    Route::get('/tasks/{taskId}', [TaskController::class, 'getTaskDetails']);


    Route::get('/tasks/project/{projectId}', [TaskController::class, 'getTasksByProjectUserId']);

Route::post('/taskmemberships', [TaskMembershipController::class, 'create']);
Route::post('/taskmemberships1', [TaskMembershipController::class, 'getUserTaskMemberships']);


Route::delete('/memberships', [MembershipController::class, 'destroy']);

Route::get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/check-chef-permissions', [AuthorizedAccessController::class, 'checkChefPermissions']);

    // Routes pour les projets
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projectsWithRole', [ProjectController::class, 'showProjectsWithRole']);

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects/{projectId}', [ProjectController::class, 'show']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    Route::get('/projects/{idOrProject}', [ProjectController::class, 'showProject']);
    Route::post('/memberships', [MembershipController::class, 'store']);

    Route::get('/user1/{id}', [UserController::class, 'getUserById']);

    Route::get('/user1', [UserController::class, 'getUser']);
    Route::post('/user/avatar', [UserController::class, 'updatePhoto']);

    Route::get('/chat/{id}', [ChatController::class, 'selectUser'])->name('chat.user');
    Route::post('/send/message', [ChatController::class, 'sendMessage'])->name('send.message');
    Route::get('/chat-users', [UserController::class, 'getChatUsers'])->name('chat-user-list');
    
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/usersAccount/{user}', [UserController::class, 'destroyUsers']);
    Route::get('/usersAccount', [UserController::class, 'indexUsers']);
    // Routes pour gérer les utilisateurs non autorisés
    Route::get('/UnauthorizedUsers', [UserController::class, 'showUnauth']);
    Route::post('/UnauthorizedUsers', [UserController::class, 'authorizeUnauthorizedUser']);
    Route::delete('/UnauthorizedUsers/{user}', [UserController::class, 'destroyUnauth']);
    Route::post('/users', [UserController::class, 'store']);

        // Endpoint pour récupérer les employés associés à un projet spécifique
        Route::get('/{projectId}/tasks', [TaskController::class, 'index']);
        Route::get('/chat/{id}', [ChatController::class, 'selectUser'])->name('chat.user');
        Route::post('/send/message', [ChatController::class, 'sendMessage'])->name('send.message');
        Route::get('/user-messages/{userId}', [ChatController::class, 'getUserMessages']);
        

        Route::post('/notifications', [NotificationController::class, 'createNotification']);
        Route::get('/notifications/{userId}', [NotificationController::class, 'getUserNotifications']);
    // Route de déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);
});


// Routes publiques (non authentifiées)
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-with-google', [AuthController::class, 'handleGoogleCallback']);
Route::post('/password-reset', [AuthController::class, 'passwordReset']);
Route::post('/new-password', [AuthController::class, 'newPassword']);
Route::post('/send-email', [MailController::class, 'sendEmail']);
Route::post('/storeUnAuthUser', [UserController::class, 'storeUnAuthUser']);