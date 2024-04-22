<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'project_id', 'user_role'];

    // Définir la relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Définir la relation avec le modèle Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function taskMemberships()
    {
        return $this->hasMany(TaskMembership::class);
    }
}
