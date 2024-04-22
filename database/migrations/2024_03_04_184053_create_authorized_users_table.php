<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthorizedUsersTable extends Migration
{
    public function up()
    {
        Schema::create('authorized_users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->enum('role', ['chef', 'member']);
            $table->enum('department', ['web', 'mobile', 'security']);
            
            $table->timestamps(); // Adds created_at and updated_at columns
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('authorized_users');
    }
}
