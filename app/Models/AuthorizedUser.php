<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthorizedUser extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'department', 'role']; // Add 'name' to the fillable attributes

}
