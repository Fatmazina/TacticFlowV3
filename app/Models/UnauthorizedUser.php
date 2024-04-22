<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnauthorizedUser extends Model
{
        protected $table = 'unauthorized_users';
    
        protected $fillable = [
            'name', 'email', 'department', 'role'
        ];
    
    }