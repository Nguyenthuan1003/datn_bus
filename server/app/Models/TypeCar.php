<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeCar extends Model
{
    use HasFactory;

    protected $table = 'type_cars';

    public function car() {
        return $this->hasMany(Car::class);
    }
}
