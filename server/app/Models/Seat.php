<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $table = 'seats';

    public function car() {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function bill() {
        return $this->hasMany(Bill::class);
    }
}
