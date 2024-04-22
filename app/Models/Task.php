<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'status', 'project_id', 'card_id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function taskMemberships()
    {
        return $this->hasMany(TaskMembership::class);
    }
 
}
