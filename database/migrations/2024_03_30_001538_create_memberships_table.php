<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembershipsTable extends Migration
{
    public function up()
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id(); // Ajouter une colonne 'id' auto-incrémentée comme clé primaire
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->string('user_role');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('memberships');
    }
}
