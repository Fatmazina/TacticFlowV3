<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User; // Assurez-vous d'importer le modèle User si ce n'est pas déjà fait

Broadcast::channel('chat.{id}', function ($user, $id) {
    // Vérifie si l'utilisateur est authentifié et si son ID correspond à l'ID spécifié dans le canal
    return $user && $user->id === (int) $id;
});
