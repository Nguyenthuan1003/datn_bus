<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'cars';

    public function typeCar() {
        return $this->belongsTo(TypeCar::class, 'id_type_car');
    }

    public function trip () {
        return $this->hasMany(Trip::class);
    }

    public function seat() {
        return $this->hasMany(Seat::class);
    }
}
