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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
<<<<<<< HEAD
            $table->string('image')->nullable();
            $table->text('description');
=======
            $table->string('image', 255);
            $table->text('description')->nullable(true);
>>>>>>> ed3f9f48b0c6e8ad586393cfdc2d53e3095f6581
            $table->integer('parent_location_id')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};