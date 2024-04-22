<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('column_c')->nullable(); // You can customize the column type and options
        });
    }
    
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('column_c');
        });
    }
    
};
