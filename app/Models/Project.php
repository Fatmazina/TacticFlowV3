<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['column_c', 'title', 'description', 'user_id'];

    public function timestamps()
    {
        return ['created_at', 'updated_at'];
    }

    protected $rules = [
        'title' => 'required|string|max:255',
        'description' => 'required|string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // Project.php

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }
}
