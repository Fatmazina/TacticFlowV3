<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    
    
    public function toArray($request)
    {
        // Ajouter l'URL de l'avatar à la réponse JSON
        $avatarUrl = $this->avatar ? asset('storage/avatars/' . $this->avatar) : null;
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $avatarUrl,
            'departement'=>$this->departement,
           'created_at'=>$this->created_at,
        ];
    }

}