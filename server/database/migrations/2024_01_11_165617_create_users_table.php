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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer('user_type_id')->nullable(false);
            $table->integer('role_id')->nullable(false);
            $table->string('email');
            $table->string('name');
            $table->string('password');
            $table->string('phone_number');
            $table->string('address')->nullable(true);
            $table->text('description')->nullable(true);
            $table->string('location')->nullable(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
