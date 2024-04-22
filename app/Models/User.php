<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

   
    protected $fillable = [
        'name', 'email', 'password', 'role', 'departement', 'avatar',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

   // In User.php model
   public function projects()
   {
       return $this->hasMany(Project::class);
   }

   public function notifications()
   {
       return $this->hasMany(Notification::class);
   }
   public function memberships()
   {
       return $this->hasMany(Membership::class);
   }
   public function message(){
    $this->hasMany(Message::class);
}

}
