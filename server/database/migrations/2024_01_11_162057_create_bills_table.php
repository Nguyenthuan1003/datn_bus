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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->integer('discount_code_id')->nullable(true);
            $table->string('seat_id')->nullable(false);
            $table->integer('trip_id')->nullable(false);
            $table->integer('user_id')->nullable(true);
            $table->integer('status_pay')->nullable(false)->default(0);
            $table->float('total_money')->nullable(false)->default(0);
            $table->float('total_money_after_discount')->nullable(false)->default(0);
            $table->string('type_pay')->nullable(false);
            $table->integer('total_seat')->nullable(false);
            $table->string('code_bill')->nullable(false);
            $table->string('phone_number')->nullable(false);
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
        Schema::dropIfExists('bills');
    }
};
