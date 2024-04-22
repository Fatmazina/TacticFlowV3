<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskMembershipsTable extends Migration
{
    public function up()
    {
        Schema::create('task_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade'); // Clé étrangère depuis la table 'tasks'
            $table->unsignedBigInteger('user_id'); // Clé étrangère de la clé primaire composite de 'memberships'
            $table->unsignedBigInteger('project_id'); // Clé étrangère de la clé primaire composite de 'memberships'
            $table->timestamps();
            
            // Définir les clés étrangères
            $table->foreign('user_id')->references('user_id')->on('memberships')->onDelete('cascade');
            $table->foreign('project_id')->references('project_id')->on('memberships')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_memberships');
    }
}
